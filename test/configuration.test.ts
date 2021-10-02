import axios from 'axios';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { getConfiguration } from '../src';

test('Configuration snapshot', () => {
    const config = getConfiguration({
        accountSlug: 'stackables-demo:prod/example1',
        generatedFile: './src/generated/webhooks.ts',
        introspectionToken: 'a89751eb-ef0d-4663-9530-fa683b9d8483',
    })

    expect(config).toMatchSnapshot()
})

test('Configuration introspection is working correctly', async () => {
    const { schema } = getConfiguration({
        accountSlug: 'stackables-demo:prod/example1',
        generatedFile: './src/generated/webhooks.ts',
        introspectionToken: 'a89751eb-ef0d-4663-9530-fa683b9d8483',
    })

    const { data } = await axios.post<any>(schema, {
        query: getIntrospectionQuery()
    })

    buildClientSchema(data.data)
})