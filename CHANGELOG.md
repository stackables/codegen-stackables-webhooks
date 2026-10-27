# codegen-stackables-webhooks

## 3.0.0

### Major Changes

- [#203](https://github.com/stackables/codegen-stackables-webhooks/pull/203) [`c4d6d2e`](https://github.com/stackables/codegen-stackables-webhooks/commit/c4d6d2e62e22abe8480c4b447fd5ba887b1d8465) Thanks [@factory-coder](https://github.com/apps/factory-coder)! - Supports graphql 17 (`graphql` is now `^16.8.1 || ^17`); graphql 16 keeps working. The package now needs Node 22 or later (`engines.node` is `>=22`), because graphql 17 requires it and an install can now resolve it; users on older Node stay on the current major. The loader now calls the endpoint with `fetch` instead of `graphql-request` (which does not support graphql 17), and its output is unchanged.

### Patch Changes

- [#198](https://github.com/stackables/codegen-stackables-webhooks/pull/198) [`b956bf2`](https://github.com/stackables/codegen-stackables-webhooks/commit/b956bf22790fac408a730c24dc1be673a1b67228) Thanks [@factory-coder](https://github.com/apps/factory-coder)! - Moves the runtime dependencies to their current majors (`@graphql-codegen/plugin-helpers` 7, `change-case-all` 2); the generated output and the configuration are unchanged.
