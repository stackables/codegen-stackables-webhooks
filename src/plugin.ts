import { Types, PluginFunction } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, concatAST, visit, DocumentNode, DirectiveNode } from 'graphql';
import { capitalCase } from 'change-case-all';

interface NamedOperationsObjectPluginConfig {
  fragmentRegistryName?: string
  fragmentRegistryDirective?: string
  omitOperationSuffix?: boolean
}

function filterByDirective(directives: readonly DirectiveNode[] | undefined, needed: string | undefined) {
  // if no restriction specified then list all
  if (!needed) return true

  // if no directive found then we cannot restrict
  if (!directives) return false

  for (let index = 0; index < directives.length; index++) {
    const directive = directives[index]

    if (directive.name.value === needed) {
      return true
    }
  }

  // if nothing matched then we ignore this fragment
  return false
}

export const plugin: PluginFunction<never, string> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: NamedOperationsObjectPluginConfig
) => {

  const fragmentRegistryName = config.fragmentRegistryName || 'FragmentRegistry'

  const docs = documents.map(v => v.document) as DocumentNode[]
  const allAst = concatAST(docs);
  const fragments: string[] = []

  visit(allAst, {
    enter: {
      FragmentDefinition: node => {
        if (filterByDirective(node.directives, config.fragmentRegistryDirective)) {
          fragments.push(capitalCase(node.name.value, { delimiter: '' }))
        }
      },
    },
  });

  const suffix = (config.omitOperationSuffix) ? '' : 'Fragment'

  const source = []

  // Wrapper type
  source.push(`export type StackablesEnvelope<T> = { 
    version: "0.1"
    payload: T
    params: any
    callback: {
      url: string
      token: string
    }
  }`)

  // Handler functions
  fragments.map(fragment => {
    source.push(`export type ${fragment}Handler = StackablesEnvelope<${fragment}${suffix}>`)
  })

  source.push(`export type ${fragmentRegistryName} = {
${fragments.map(fragment => `  'stackables.webhook.${fragment}': ${fragment}Handler`).join('\n')}
  }`)

  return source.join('\n')
};