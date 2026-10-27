import { loadDocuments } from '@graphql-tools/load'
import { test } from 'node:test'
import { plugin } from '../src/index.ts'

test('Plugin generated wrapped types for provided documents with correct decorator', async (t) => {

    // Schema is not used for index generation
    const schema = undefined as any

    // Generate test documents
    const fragments = await loadDocuments(`
    
    query ToBeIgnored {
        TestType {
            ...IgnoreThisOne
        }
    }

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

    // output configuration 1
    const output1 = plugin(schema, fragments, { fragmentRegistryDirective: 'generate1', omitOperationSuffix: false })
    t.assert.snapshot(output1)

    // output configuration 2
    const output2 = plugin(schema, fragments, { fragmentRegistryDirective: 'generate2', omitOperationSuffix: true, fragmentRegistryName: 'WebhookMap' })
    t.assert.snapshot(output2)

    // output configuration 3
    const output3 = plugin(schema, fragments, {})
    t.assert.snapshot(output3)
})
