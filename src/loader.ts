import { parse } from "graphql";
import { gql, GraphQLClient } from "graphql-request";

export default async function (
	endpoint: string,
	_: unknown,
	conf: Record<string, { bearerToken: string }>
) {
	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${conf[endpoint].bearerToken}`,
		},
	});

	const query = gql`
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

	const data = await graphQLClient.request(query);
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
