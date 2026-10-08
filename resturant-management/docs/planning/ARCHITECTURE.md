# Proposed Architecture

## Recommendation

Use a modular monolith: Node.js, Express, TypeScript (recommended for safer domain and API contracts), MongoDB, and Mongoose. This matches the suggested stack and the document-shaped restaurant/menu/order data. Keep one deployable service and one database initially; modules communicate through application services, not network calls.

TypeScript is a recommendation rather than an agreed requirement. If the project requires JavaScript for coursework compatibility, use modern JavaScript with JSDoc and equivalent validation.

## Layer boundaries

```text
HTTP routes/controllers -> application use cases -> domain rules
                                      |                  |
                                      v                  v
                              repositories         pure policies
                                      |
                                      v
                                  Mongoose
```

- **API/controllers:** route wiring, authentication/authorization middleware, request/response mapping. No business rules or direct database queries.
- **Application/use cases:** register/login, manage restaurant/menu, mutate cart, checkout, cancel/update order; owns transaction orchestration.
- **Domain:** role/resource policies, money calculations, order transition rules, cart/checkout invariants.
- **Persistence:** Mongoose schemas, indexes, repository implementations, transaction/session handling.
- **Cross-cutting:** configuration, logging, validation, error mapping, security middleware, image-provider adapter.

## Suggested source layout

```text
src/
  app.ts                 # Express setup; no listener side effects
  server.ts              # startup, database connection, graceful shutdown
  config/                # validated environment and dependency setup
  shared/                # errors, logger, pagination, response conventions
  modules/
    auth/                 # routes, controller, schemas, service/use cases
    users/
    restaurants/
    catalog/              # categories and menu items
    cart/
    orders/
    admin/
  infrastructure/
    database/             # connection, repositories, migrations/index setup
    images/               # Cloudinary adapter
  middleware/            # authenticate, authorize, validate, rate limits, errors
tests/
  unit/
  integration/
  api/
```

Each module may have `*.routes`, `*.controller`, `*.service`/`use-case`, `*.repository`, `*.validation`, and domain types as needed. Avoid creating generic layers that do not serve a concrete use case.

## Authentication and authorization

- Password hashes use bcrypt with a configurable work factor and never leave persistence.
- JWT bearer access tokens use a 15-minute expiry by default and have explicit issuer, audience, and signing algorithm configuration. Use a signing key from secrets, not a default. Authentication checks the user's token version against MongoDB so logout, password change, and blocking revoke issued tokens.
- Middleware verifies the token and account state and attaches a minimal authenticated principal.
- Role checks are followed by ownership checks in the use case/repository query. A role alone never grants cross-restaurant access.
- Public registration is customer-only. Privileged account provisioning is unresolved.
- Logout/password-change revocation behavior depends on the chosen token strategy; see `DECISIONS.md`.

## Data and transaction approach

Use MongoDB collections for independent aggregate roots. Embed cart/order line items as bounded snapshots/subdocuments. Reference users, restaurants, categories, and menu items by ObjectId. Keep order snapshots immutable after checkout. Use unique and compound indexes for identity and tenant-scoped constraints.

Checkout should be one application use case: validate and price from current persisted state; create immutable order; clear cart; commit atomically. A MongoDB multi-document transaction requires a replica set. If the deployment cannot provide one, choose and document a different consistency design before implementation.

## API conventions

- Prefix `/api`; JSON request/response; stable envelope and error mapping.
- Validate request bodies, path parameters, and query parameters centrally.
- Use resource-oriented plural paths; use action subresources for stateful commands such as `cancel` and `availability`.
- Pagination defaults and maximums must be configured centrally. Return `data` and `pagination` metadata.
- Use 201 for creation, 200 for reads/updates, 204 only if the shared response envelope is intentionally omitted, 401/403/404/409/422 for mapped failures.
- Add request IDs and structured logs. OpenAPI documentation is the canonical API contract.

## Security baseline

Helmet/security headers, strict CORS allowlist, JSON/body limits, auth endpoint rate limits, input validation, Mongo query/operator sanitization, password hashing, safe error responses, secure secret management, least-privilege database credentials, and audit entries for privileged actions. Deploy behind TLS. Image provider credentials stay server-side.

## Image handling

Cloudinary is an optional infrastructure provider in the requirements. Store provider asset identifiers and validated HTTPS delivery URLs; do not persist raw image binaries in MongoDB. Upload authorization, file type/size limits, replacement, and cleanup policy need agreement.

## Why not microservices

The stated scope is one cohesive workflow with shared data and transactional checkout. There is no independent scaling, ownership, or deployment requirement that justifies distributed services yet. Module boundaries preserve a path to extraction if operational evidence later supports it.
