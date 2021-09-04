import { Types } from '@graphql-codegen/plugin-helpers'
import { plugin } from '../src'
import { loadDocuments } from '@graphql-tools/load'

test('Plugin generated wrapped types for provided documents with correct decorator', async () => {

    // Schema is not used for index generation
    const schema = undefined as any

    // Generate test documents
    const fragments = await loadDocuments(`
    
    fragment IgnoreThisOne on TestType {
        id
    }

    fragment Webhook1 on TestType @generate1 {
        id
        name
    }

    fragment Webhook2 on TestType @generate2 {
        id
    }

    `, {} as any)

    const output1 = plugin(schema, fragments, {
        fragmentRegistryDirective: 'generate1',
        omitOperationSuffix: false
    })
    expect(output1).toMatchSnapshot()

    const output2 = plugin(schema, fragments, {
        fragmentRegistryDirective: 'generate2',
        omitOperationSuffix: true
    })
    expect(output2).toMatchSnapshot()

    const output3 = plugin(schema, fragments, {})
    expect(output3).toMatchSnapshot()
})