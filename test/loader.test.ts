import loader from '../src'

test('Test Loader', async () => {
    const output = await loader('https://data.stackables.io/stackables-test/webhooks?introspection=a89751eb-ef0d-4663-9530-fa683b9d8483')
    expect(output).toMatchSnapshot()
})
