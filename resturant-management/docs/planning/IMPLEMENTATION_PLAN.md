# Implementation Plan (Approval Required Before Coding)

The milestones are ordered so each can be reviewed independently. Do not begin implementation until the user approves the proposed architecture and resolves blocking data/business decisions in `DECISIONS.md`.

## M0 — Requirements and design approval

- **Objective:** Freeze initial scope, architecture, data model, and API decisions.
- **Files/modules:** `REQUIREMENTS.md`, `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `DECISIONS.md`, this plan.
- **Tasks:** Answer blocking questions; confirm stack, money/currency, checkout, roles, lifecycle, and deployment assumptions; update docs.
- **Tests:** Documentation review against source requirements; no executable tests.
- **Acceptance:** User approves a coherent first-release scope and schema/API proposal; unresolved items are explicitly deferred.
- **Dependencies:** None.

## M1 — Project foundation and configuration

- **Objective:** Establish an understandable, secure service skeleton.
- **Files/modules:** package metadata, TypeScript/build/lint/format config (if approved), `src/app`, `src/server`, config, logging, shared errors/response, health route, `.env.example`, README.
- **Tasks:** Startup validation, database lifecycle, structured request logging/request ID, graceful shutdown, central error handler, security headers, CORS, body limits.
- **Tests:** Config validation and health/error middleware smoke tests.
- **Acceptance:** Service starts only with valid configuration; health/readiness behavior is documented; no real secrets are committed.
- **Dependencies:** M0.

## M2 — Persistence foundation

- **Objective:** Establish safe MongoDB models, indexes, and migration/seed conventions.
- **Files/modules:** database connection, migration runner, repository interfaces/adapters, initial user/restaurant/catalog/cart/order schemas, seed command.
- **Tasks:** Add approved schema constraints/indexes, timestamps, soft-delete conventions, replica-set transaction support, deterministic development seed data.
- **Tests:** Model/index integration checks; seed idempotency check against isolated database.
- **Acceptance:** Fresh database setup and seed are repeatable; indexes match approved `DATABASE.md`; no destructive production seeding.
- **Dependencies:** M0, M1.

## M3 — Authentication and account access

- **Objective:** Deliver customer registration/login and protected identity APIs.
- **Files/modules:** auth/users routes, controllers, use cases, validators, password/JWT adapters, authenticate/authorize middleware.
- **Tasks:** Register/login/logout contract, safe serialization, profile update, change password, blocked-account checks, auth throttling.
- **Tests:** Unit and API tests for duplicate registration, bad credentials, malformed/expired token, profile allowlist, revocation behavior, role escalation attempts.
- **Acceptance:** Public registration cannot set privileged role; password/token material never appears in responses or logs.
- **Dependencies:** M2 and approved auth decisions.

## M4 — Restaurant and catalog management

- **Objective:** Implement restaurant, category, and menu read/write workflows.
- **Files/modules:** restaurants/catalog modules, image adapter boundary, validators, repositories, OpenAPI docs.
- **Tasks:** Public browsing/filtering/pagination; ownership-scoped admin CRUD; activation/deactivation; category/menu consistency; search indexes.
- **Tests:** API tests for filters, pagination, cross-tenant writes, inactive resource visibility, invalid category/restaurant relationships.
- **Acceptance:** Restaurant admins cannot read/write another restaurant's admin data; public responses expose only approved active data.
- **Dependencies:** M3.

## M5 — Cart and checkout pricing

- **Objective:** Implement single-restaurant cart and authoritative server-side pricing.
- **Files/modules:** cart module, pricing policy, checkout use case, transaction/idempotency support.
- **Tasks:** Add/update/remove/clear items; current-price cart summary; validate restaurant and menu state; define behavior for cross-restaurant add.
- **Tests:** Unit pricing tests and integration/API tests for invalid quantities, unavailable items, restaurant mismatch, concurrent/retried checkout prerequisites.
- **Acceptance:** Client cannot set price/totals; cart invariants hold under concurrent updates.
- **Dependencies:** M4 and approved cart rules.

## M6 — Orders and lifecycle

- **Objective:** Implement transactional checkout and scoped order management.
- **Files/modules:** orders module, order transition policy, order number generation, audit/status history.
- **Tasks:** Checkout snapshots, cart clear, customer history/detail/cancel, restaurant lists/status updates, admin list, date/status filters.
- **Tests:** Transaction integration tests, duplicate retry/idempotency tests, authorization isolation, legal/illegal transition tests, stale item and inactive restaurant tests.
- **Acceptance:** Order and cart update are consistent; prices/items remain historically stable; unauthorized parties cannot access or mutate orders.
- **Dependencies:** M5 and approved payment, cancellation, status, and transaction rules.

## M7 — Super-admin and operational statistics

- **Objective:** Complete administrative controls and bounded dashboard queries.
- **Files/modules:** admin module, audit persistence, aggregation queries.
- **Tasks:** User block/unblock, restaurant administration, all-order access, dashboard counts/revenue per approved definition.
- **Tests:** Role tests, self-lockout policy test, aggregation boundary tests.
- **Acceptance:** Admin-only access is enforced and statistics match documented definitions.
- **Dependencies:** M3, M4, M6.

## M8 — Hardening, docs, and release readiness

- **Objective:** Make the API usable and deployable by another developer.
- **Files/modules:** OpenAPI, API collection, README, deployment config/docs, CI, test suite, seed data.
- **Tasks:** Complete endpoint collection, threat/security review, rate limits, indexes/query review, backup/health guidance, logging/audit review.
- **Tests:** Full automated suite and documented local integration workflow; run collection against local environment.
- **Acceptance:** Setup from clean checkout is documented; required endpoints and error cases are covered; deployment configuration has no embedded secrets.
- **Dependencies:** M1–M7.

## Optional later milestones

Reviews, favorites, coupons, saved addresses, notifications, and online payments are separate scope decisions. Add a milestone only after their workflows, permissions, and data retention rules are approved.
