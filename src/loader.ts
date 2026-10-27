import { parse } from "graphql";

const query = `
	query CodeGenWebhooks {
		Webhook: _Webhook {
			list {
				name
				fragment
				entity {
					id
				}
			}
		}
	}
`;

export default async function (
	endpoint: string,
	_: unknown,
	conf: Record<string, { bearerToken: string }>
) {
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${conf[endpoint].bearerToken}`,
		},
		body: JSON.stringify({ query }),
	});

	if (!response.ok) {
		throw new Error(
			`Loading webhooks from ${endpoint} failed: HTTP ${response.status} ${response.statusText}`
		);
	}

	const { data, errors } = (await response.json()) as {
		data?: any;
		errors?: { message: string }[];
	};

	if (errors?.length) {
		throw new Error(
			`Loading webhooks from ${endpoint} failed: ${errors
				.map((e) => e.message)
				.join("; ")}`
		);
	}

	const fragments = data.Webhook.list;

	return parse(
		fragments
			.map(
				(f: any) =>
					`fragment ${f.name} on ${f.entity.id} @register ${f.fragment}`
			)
			.join("\n")
	);
}
