---
"codegen-stackables-webhooks": major
---

Supports graphql 17 (`graphql` is now `^16.8.1 || ^17`); graphql 16 keeps working. The package now needs Node 22 or later (`engines.node` is `>=22`), because graphql 17 requires it and an install can now resolve it; users on older Node stay on the current major. The loader now calls the endpoint with `fetch` instead of `graphql-request` (which does not support graphql 17), and its output is unchanged.
