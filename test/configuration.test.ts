import axios from "axios";
import { buildClientSchema, getIntrospectionQuery } from "graphql";
import { test } from "node:test";
import { getConfiguration } from "../src/index.ts";

test("Configuration snapshot", (t) => {
	const config = getConfiguration({
		accountSlug: "stackables-demo:prod/example1",
		generatedFile: "./src/generated/webhooks.ts",
		introspectionToken: "a89751eb-ef0d-4663-9530-fa683b9d8483",
		bearerToken: "",
	});

	t.assert.snapshot(config);
});

test("Configuration introspection is working correctly", { skip: true }, async () => {
	const { schema } = getConfiguration({
		accountSlug: "stackables-demo:prod/example1",
		generatedFile: "./src/generated/webhooks.ts",
		introspectionToken: "a89751eb-ef0d-4663-9530-fa683b9d8483",
		bearerToken: "",
	});

	const { data } = await axios.post<any>(schema, {
		query: getIntrospectionQuery(),
	});

	buildClientSchema(data.data);
});
