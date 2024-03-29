import loader from "../src";

jest.setTimeout(30000);

test.skip("Test Loader", async () => {
	const output = await loader(
		"https://data.stackables.io/stackables-demo:prod/example1?introspection=a89751eb-ef0d-4663-9530-fa683b9d8483",
		undefined,
		{
			"https://data.stackables.io/stackables-demo:prod/example1?introspection=a89751eb-ef0d-4663-9530-fa683b9d8483":
				{ bearerToken: "" },
		}
	);
	expect(output).toMatchSnapshot();
});
