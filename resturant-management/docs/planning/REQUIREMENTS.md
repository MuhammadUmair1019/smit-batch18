# Restaurant Backend Requirements

## Source and scope

This document captures the user-provided Restaurant Backend requirements. The requirements are the source of truth. This project is currently in planning; implementation and database schema creation are pending review and approval.

## Functional requirements

### Authentication and users
- Register customers with name, unique email, password, and phone. New public registrations receive the `customer` role.
- Log in with email/password and receive an access token and safe user representation.
- Authenticate bearer tokens and authorize by role plus resource ownership.
- Read and update the current user's name/phone; change password after verifying the current password.
- Log out. The logout contract needs a token/session revocation decision.
- Super admins can list/manage users and block/unblock accounts.

### Restaurants, categories, and menu
- Public users can list and view active restaurants, with pagination, search, city, and open/closed filters.
- Restaurant admins manage their assigned restaurant; super admins manage all restaurants. Restaurant records can be deactivated/soft-deleted.
- Categories belong to one restaurant and have name, description, image, sort order, and active state.
- Menu items belong to one restaurant and one category. They have descriptive fields, price, optional discount price, ingredients, image, availability, and preparation time.
- Menu lists support search, category, price range, availability, and pagination.
- Restaurant administrators can view their restaurant's orders; super admins can view all orders.

### Cart and orders
- A customer has a cart that contains items from one restaurant at a time.
- Cart item prices and checkout totals are computed by the server; client-supplied prices/totals are never trusted.
- Checkout validates restaurant and item state, snapshots item names/prices, calculates amounts, creates an order, then clears the cart.
- Customers can list/read only their own orders and cancel only in eligible states.
- Restaurant admins can update order states only for their restaurant; super admins can administer all orders.
- Order state changes follow an allowed transition graph, not arbitrary status assignment.

### Administration and optional capabilities
- Super admin endpoints cover users, restaurants, orders, and dashboard statistics.
- Reviews, favorites, coupons, saved addresses, and notifications are optional and excluded from the initial scope unless explicitly approved.
- Seed data is requested for one super admin, two restaurant admins, three customers, at least three restaurants, five categories per restaurant, and ten menu items per restaurant.
- A Postman/Thunder Client collection and automated tests are required deliverables.

## Non-functional requirements

- Production-minded security, validation, error handling, maintainable modules, and documentation.
- API-first REST conventions with consistent success/error response envelopes and HTTP status codes.
- Database-backed relationships and migrations/schema evolution strategy.
- Environment-driven configuration; `.env.example`, no committed secrets.
- Authentication rate limiting, CORS configuration, structured logs, and request validation.
- Pagination for large collections; protect private data and tenant boundaries.
- Automated tests for critical API and business logic.

## Actors and permissions

| Actor | Capabilities |
| --- | --- |
| Anonymous visitor | Register/login; browse public active restaurants, categories, and available menu items. |
| Customer | Own profile/cart/orders; checkout; cancel own eligible orders; browse. |
| Restaurant admin | Manage assigned restaurant, categories, menu, and orders for that restaurant. |
| Super admin | Manage users/restaurants/orders/menu data, block users, activate/deactivate restaurants, access statistics. |

Public registration must not accept a privileged role. How super-admin and restaurant-admin accounts are provisioned is open.

## Validation requirements

- Validate body, path IDs, and query parameters at the HTTP boundary; reject unknown fields for write requests unless there is a documented reason to allow them.
- Normalize email before uniqueness checks; enforce unique email in persistence as well as service logic.
- Enforce password policy and phone format once agreed.
- Validate positive integer quantities, nonnegative monetary values, price range ordering, pagination bounds, enum values, and date filters.
- Verify category and menu item belong to the route restaurant; verify restaurant-admin ownership on every write/read scope.
- On checkout, re-read current item/restaurant state and price; reject empty carts, unavailable/deactivated resources, invalid quantity, and changed business constraints.
- Validate status transitions and cancellation eligibility in the domain/service layer.

## Error handling

Use a centralized error handler and stable envelope: `{ success: false, message, errors: [] }`. Map validation failures to 400 or 422 consistently (decision pending), unauthenticated to 401, unauthorized to 403, missing resources to 404, uniqueness/state conflicts to 409, and unexpected failures to 500. Do not return stack traces, secrets, password hashes, token internals, or database error details in production. Include a request/correlation ID in logs and, preferably, error responses.

## Audit and logging requirements

- Structured application logs with request ID, actor ID where available, route, outcome, duration, and safe error metadata.
- Never log passwords, bearer tokens, payment credentials, or full sensitive payloads.
- Record actor and timestamps for administrative mutations and order status transitions. Exact retention and audit history requirements are open.
- Keep immutable order item/address/price snapshots needed for order history.

## Testing strategy

- Unit tests: pricing calculations, role/resource authorization, state transitions, and validators.
- Integration tests: repositories/models and transaction behavior against an isolated MongoDB replica set or compatible test service.
- API tests: auth, CRUD, filtering/pagination, cart and checkout, access isolation, and status transitions.
- Negative cases: duplicate email, invalid/expired/missing JWT, blocked user, invalid IDs, cross-restaurant/cross-user access, inactive resources, stale cart item, empty cart, invalid quantity, and invalid transition.
- Seed script and API collection should be repeatable and avoid production credentials/data.

## Deployment requirements

- Node.js/Express service with environment validation at startup, MongoDB connection health checks, graceful shutdown, and health/readiness endpoint.
- Deploy MongoDB with replica-set capability if multi-document transactions are used.
- Store JWT signing keys and Cloudinary credentials in a secret manager/environment, never source control.
- Configure TLS at the deployment edge, CORS allowlist, proxy awareness, request/body size limits, and production rate limits.
- Define CI steps for lint/format, type/static checks (if TypeScript is selected), tests, and build. Hosting platform, environment topology, backups, and observability provider remain open.

## Scalability and operational risks

- MongoDB text/search requirements may outgrow basic indexes; search semantics and expected data volume should guide use of Atlas Search or a dedicated search service later.
- Offset pagination is simple initially; very large datasets may require cursor pagination.
- Order creation must avoid duplicate checkout on retries (idempotency) and handle concurrent cart updates.
- MongoDB transactions require a replica set and have operational overhead; deployment must support it or checkout persistence design must change.
- Popular restaurant/menu reads may need caching later; do not cache authorization-sensitive or frequently changing availability without invalidation rules.
- Image uploads should use signed/direct cloud uploads or controlled server uploads; define ownership, file limits, and orphan cleanup.
- Statistics queries can become expensive; initially use indexed aggregations and bounded date ranges.

## Open questions

See `DECISIONS.md` for questions requiring product decisions before schema/API freeze.
