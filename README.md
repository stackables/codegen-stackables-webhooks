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
    generatedFile: "<string>",
    accountSlug: "<string>",
    introspectionToken: "<string>"
})
```

[See full configuration options here](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/config.md)

## Usage

Generated types are easy to use with [cloudevents-router](https://github.com/stackables/cloudevents-router) package.

```typescript
import { CloudEventsRouter } from 'cloudevents-router'
import { FragmentRegistry } from './src/generated/webhooks'

const router = new CloudEventsRouter<FragmentRegistry>()

router.on('stackables.webhook.v1.YourHookName', async (event) => {
    console.log('Received typed webhook', event.data)
})
```

See more options on how to use the router with different web servers [here](https://github.com/stackables/cloudevents-router). But simplest is to just use nodejs built in web server like this:

```typescript
import http from "http"
import { getMiddleware } from "cloudevents-router"

// const router = ... 

const middleware = getMiddleware(router, { path: '/' })
const server = http.createServer(middleware)

server.listen(5000);
```

## Advanced Usage

- [Payload structure](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/advanced.md)
- [Provided configuration](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/advanced.md)
- [Callback tokens](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/advanced.md)
- [Branches](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/advanced.md)

## Deployment options

You can deploy the created web service anywhere as long as its publicly accessible. **But,** You need to ensure that you validate the Stackables JWT token. [Instructions here](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/deploy.md)

You can also use Stackables cloud to host your webhooks, in this case authentication and scaling is taken care of by us. [Instructions here](https://github.com/stackables/codegen-stackables-webhooks/blob/beta/docs/deploy.md)

## Thats it ...

... happy coding :)