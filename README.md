# Stackables Webhooks

GraphQL Code Generator plugin for Stackables webhooks.

## Install

This is a plugin for GraphQL Code Generator. [See official installation docs for more info](https://www.graphql-code-generator.com/docs/getting-started/installation).

All packages should be installed as dev dependencies and are used only during development.

```bash
# install generator cli
npm install --save-dev @graphql-codegen/cli

# required typescript plugins
npm install --save-dev @graphql-codegen/typescript
npm install --save-dev @graphql-codegen/typescript-operations

# webhooks plugin
npm install --save-dev codegen-stackables-webhooks@beta
```

## Configuration

While GraphQL Code Generator configuration is simple we still recommend to use the [graphql configuration](https://graphql-config.com/introduction) for more universal configuration. 

We also provide a simple utility to help with the verbosity. But you can always take full control when you need to.

`graphql.config.js` in repository root

```js
const { getConfiguration } = require('stackables-webhooks');

// Returned configuration is just a plain object
// So if needed you can add or modify the returned setting as needed

module.exports = getConfiguration({
    account: '<account>',
    token:'<token>'
})
```

[See full configuration options here]()

## Usage

