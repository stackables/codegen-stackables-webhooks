import { print } from "graphql";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
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

test("Loader fetches the webhook fragments with the bearer token and registers them", async (t) => {
	const requests: { authorization?: string; body: string }[] = [];
	const server = createServer((req, res) => {
		let body = "";
		req.on("data", (chunk) => (body += chunk));
		req.on("end", () => {
			requests.push({ authorization: req.headers.authorization, body });
			res.setHeader("content-type", "application/json");
			res.end(
				JSON.stringify({
					data: {
						Webhook: {
							list: [
								{ name: "NodeDeleted", fragment: "{ id }", entity: { id: "DataEntityNode" } },
							],
						},
					},
				})
			);
		});
	});
	await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
	t.after(() => server.close());

	const endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}/graphql`;
	const document = await loader(endpoint, undefined, {
		[endpoint]: { bearerToken: "secret-token" },
	});

	t.assert.strictEqual(requests.length, 1);
	t.assert.strictEqual(requests[0].authorization, "Bearer secret-token");
	t.assert.match(requests[0].body, /CodeGenWebhooks/);
	t.assert.strictEqual(
		print(document),
		"fragment NodeDeleted on DataEntityNode @register {\n  id\n}"
	);
});
