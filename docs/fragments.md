# Manual fragments configuration

Stackables stores webhook data requirements as fragment definitions against the base entity. While in most cases the plugin will just load the fragments dynamically from the service, it is possible to define fragments manually.

Fragments can be stored in any graphql document as long as the codegen configuration is set correctly to find them.

`src/webhooks.gql` for example might look like this

```graphql
fragment YourWebhookName on EntityToMonitor {
    fields
    you
    want {
        to
        receive
    }
}
```

For the generator plugin to consider this fragment as webhook definition we need to mark it with a special decorator (if you change the name of the decorator you need to change generator configuration to match the new name).

```graphql
fragment YourWebhookName on EntityToMonitor @register {
    # by default generator uses @register decorator
}
```