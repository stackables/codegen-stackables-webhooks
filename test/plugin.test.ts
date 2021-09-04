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

    fragment Webhook1 on TestType @generate {
        id
        name
    }

    `, {} as any)

    const output = plugin(schema, fragments, {
        fragmentRegistryDirective: 'generate',
        omitOperationSuffix: false
    })
    expect(output).toMatchSnapshot()
})