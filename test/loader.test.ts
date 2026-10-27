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
