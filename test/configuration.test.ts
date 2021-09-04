import { getConfiguration } from '../src'
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import axios from 'axios'

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

    const { data } = await axios({
        url: schema,
        method: 'post',
        data: {
            query: getIntrospectionQuery()
        }
    })

    buildClientSchema(data.data)
})