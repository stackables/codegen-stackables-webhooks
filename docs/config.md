## Recommended setup

While GraphQL Code Generator configuration is simple we still recommend to use the [graphql configuration](https://graphql-config.com/introduction) for more universal configuration. 

We also provide a simple utility to help with the verbosity. But you can always take full control when you need to.

`graphql.config.js` in repository root

```js
const { getConfiguration } = require('codegen-stackables-webhooks');

// Returned configuration is just a plain object
// So if needed you can add or modify the returned setting as needed

module.exports = getConfiguration({
    generatedFile: "<string>",
    accountSlug: "<string>",
    introspectionToken: "<string>"
})
```

## Manual setup

See full configuration reference at https://www.graphql-code-generator.com/docs/getting-started/codegen-config

Plugin requires 3 configuration settings:
- **Graphql schema** - Your graphql schema reference
- **Fragment loader** - Fragments in filesystem (marked with special decorator) or load fragments from stackables cloud directly
- **Webhooks type generator** - Register plugin to generate type map for [cloudevents-router](https://github.com/stackables/cloudevents-router) package

### With Fragment loader

`codegen.yml` in repository root

```yml
schema: https://data.stackables.io/stackables-test/webhooks?introspection=<token>
documents:
- "https://data.stackables.io/stackables-test/webhooks?introspection=<token>":
  loader: "codegen-stackables-webhooks"
generates:
  ./src/cloudevents.ts:
    plugins:
      - typescript
      - typescript-operations
      - stackables-webhooks
    config:
      preResolveTypes: true
      onlyOperationTypes: true
      fragmentRegistryName: StackablesEvents
      fragmentRegistryDirective: register
```

### Without Fragment loader

`codegen.yml` in repository root

```yml
schema: https://data.stackables.io/stackables-test/webhooks?introspection=<token>
documents: **/*.gql
generates:
  ./src/cloudevents.ts:
    plugins:
      - typescript
      - typescript-operations
      - stackables-webhooks
    config:
      preResolveTypes: true
      onlyOperationTypes: true
      fragmentRegistryName: StackablesEvents
      fragmentRegistryDirective: register
```

**If you decide to NOT load the fragments dynamically you need to define the fragments for your webhooks manually (and keep them up to date with the service). [See instructions here](https://github.com/stackables/codegen-stackables-webhooks/blob/main/docs/fragments.md)**

### Configuration options

- **fragmentRegistryName:** StackablesEvents
- **fragmentRegistryDirective:** register