import { print } from "graphql";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { test, type TestContext } from "node:test";
import loader from "../src/index.ts";

test("Test Loader", { skip: true, timeout: 30000 }, async (t) => {
	const output = await loader(
		"https://data.stackables.io/stackables-demo:prod/example1?introspection=a89751eb-ef0d-4663-9530-fa683b9d8483",
		undefined,
		{
			"https://data.stackables.io/stackables-demo:prod/example1?introspection=a89751eb-ef0d-4663-9530-fa683b9d8483":
				{ bearerToken: "" },
		}
	);
	t.assert.snapshot(output);
});

const webhooks = {
	data: {
		Webhook: {
			list: [
				{ name: "NodeDeleted", fragment: "{ id }", entity: { id: "DataEntityNode" } },
			],
		},
	},
};

// A local server standing in for the Stackables endpoint; answers every request with `status` and `payload`.
async function serve(
	t: TestContext,
	status: number,
	payload: unknown,
	requests: { method?: string; contentType?: string; authorization?: string; body: string }[] = []
) {
	const server = createServer((req, res) => {
		let body = "";
		req.on("data", (chunk) => (body += chunk));
		req.on("end", () => {
			requests.push({
				method: req.method,
				contentType: req.headers["content-type"],
				authorization: req.headers.authorization,
				body,
			});
			res.statusCode = status;
			res.setHeader("content-type", "application/json");
			res.end(JSON.stringify(payload));
		});
	});
	await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
	t.after(() => server.close());
	return `http://127.0.0.1:${(server.address() as AddressInfo).port}/graphql`;
}

test("Loader fetches the webhook fragments with the bearer token and registers them", async (t) => {
	const requests: { method?: string; contentType?: string; authorization?: string; body: string }[] = [];
	const endpoint = await serve(t, 200, webhooks, requests);
	const document = await loader(endpoint, undefined, {
		[endpoint]: { bearerToken: "secret-token" },
	});

	t.assert.strictEqual(requests.length, 1);
	t.assert.strictEqual(requests[0].method, "POST");
	t.assert.strictEqual(requests[0].contentType, "application/json");
	t.assert.strictEqual(requests[0].authorization, "Bearer secret-token");
	t.assert.match(JSON.parse(requests[0].body).query, /CodeGenWebhooks/);
	t.assert.strictEqual(
		print(document),
		"fragment NodeDeleted on DataEntityNode @register {\n  id\n}"
	);
});

test("Loader fails with the HTTP status when the endpoint answers with an error", async (t) => {
	const endpoint = await serve(t, 401, {});
	await t.assert.rejects(
		loader(endpoint, undefined, { [endpoint]: { bearerToken: "wrong" } }),
		/failed: HTTP 401/
	);
});

test("Loader fails with the GraphQL errors the endpoint returns", async (t) => {
	const endpoint = await serve(t, 200, { errors: [{ message: "Not allowed" }] });
	await t.assert.rejects(
		loader(endpoint, undefined, { [endpoint]: { bearerToken: "secret-token" } }),
		/Not allowed/
	);
});
