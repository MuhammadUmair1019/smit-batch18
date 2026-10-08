# Decisions and Open Questions

## Proposed defaults for review

These are recommendations, not approved business rules.

| Topic | Proposed default | Why it is still a decision |
| --- | --- | --- |
| Architecture/stack | **Approved:** modular monolith; Node.js + Express + TypeScript + MongoDB/Mongoose | Confirmed by user. |
| Public registration | Creates customer only | Explicitly required; admins are provisioned by super admin/seed. |
| Restaurant admin scope | **Approved:** super admin provisions restaurant admins; `ownerUserId` references one admin, and each admin may own/manage multiple restaurants; ownership checks apply to every operation | User confirmed provisioning and multi-restaurant admins. Multiple admins assigned to the same restaurant remain unspecified; v1 proposes one owner per restaurant. |
| Currency | **Approved:** PKR, stored as integer paisa | Confirmed by user. Tax/service-fee rules remain unspecified. |
| Cart price | Store item IDs/quantities; calculate current prices on read and checkout | Requirement says never trust client price, but whether to show price-change warnings is unspecified. |
| Cart restaurant switch | Reject adding a second restaurant and ask customer to clear/switch cart | Requirement says one restaurant at a time but not replacement behavior. |
| Checkout | Atomic order creation + cart clear via MongoDB transaction; idempotency key | Transactions require replica set; retry/concurrency behavior unspecified. |
| Discounts | No coupons in initial scope; `discountPrice` is a menu price only | Checkout says apply valid discounts, while coupons are marked optional and no coupon API is defined. |
| Delivery fee | **Approved:** one flat fee per restaurant; store as integer paisa | The fee amount is configured as part of restaurant setup; taxes/service fees are not included in v1. |
| Payment | **Approved:** cash only in v1; mark paid when delivered; online payment deferred | — |
| Restaurant open state | **Approved:** derive status from weekly opening hours and restaurant timezone | Holiday exceptions, overnight ranges, and manual override remain unspecified. |
| Deletion | Deactivate/soft-delete restaurants/categories/items; preserve orders | Categories with menu items and retention/privacy requirements are unspecified. |
| Cancellation | **Approved:** customer may cancel `pending` or `confirmed`; restaurant admin may reject `pending` | Cancellation reason and any refund behavior are not applicable to cash v1 but may be revisited. |
| Order transitions | **Approved:** sequential `pending -> confirmed -> preparing -> ready -> out_for_delivery -> delivered`; restaurant admin performs transitions; reject from `pending` | Exception handling and actor for delivered confirmation can be refined later. |
| Auth/session | **Approved:** JWT is revoked on logout, password change, or account block; use a token version on the user record (logout revokes all of that user's tokens) | Current-token-only versus all-session logout was not specified; global per-user revocation is proposed for simple reliable v1 behavior. |
| Search | Mongo indexes/basic search initially; Atlas Search if relevance requirements justify it | Search language, typo tolerance, and expected catalog size are unknown. |
| Optional features | Exclude reviews/favorites/coupons/addresses/notifications from initial release | Explicitly labeled optional; each changes schema/API and timelines. |

## Questions to resolve before schema/API freeze

### Blocking business and data decisions

1. **Stack/runtime:** Approve Node.js + Express + TypeScript + MongoDB/Mongoose, or specify required JavaScript/runtime/version constraints?
2. **Currency and money:** Approved PKR stored as integer paisa. Are tax or service fees required?
3. **Admin provisioning and ownership:** Approved: super admin provisions restaurant admins; one admin may manage multiple restaurants. Can a restaurant have multiple admins? V1 currently assumes one owner per restaurant.
4. **Delivery and checkout:** Approved delivery-only, per-restaurant flat fee, cash, and rejecting mixed restaurant carts. Restaurant setup supplies fee in PKR paisa. Idempotency key is recommended for checkout.
5. **Discounts:** Does `discountPrice` fully define discounts for v1, or must coupons be part of checkout despite being listed as optional?
6. **Payments:** Approved cash-only in v1; mark payment `paid` when the order is delivered.
7. **Cart switching:** Approved mixed-restaurant adds are rejected; customer must clear existing cart before adding another restaurant.
8. **Hours/open status:** Approved weekly schedules with timezone. Holiday exceptions and manual overrides are not in v1 unless requested.
9. **Order lifecycle:** Approved sequential documented flow; customer cancellation in `pending`/`confirmed`; admin rejection from `pending`.
10. **Soft deletion:** Should category deletion be blocked while it has active items, cascade-deactivate items, or allow hidden references? How long must user/order data be retained?
11. **Auth revocation:** Approved revocation on logout/password change/block; proposed user token version invalidates all tokens for that user. Confirm if logout should revoke only the current token instead.

### Operational/API decisions

12. **Images:** Is Cloudinary required? Should the backend accept uploads or issue signed upload parameters? Allowed types, size limits, and cleanup behavior?
13. **Pagination/search:** Is page/limit sufficient? What maximum page size and search behavior are expected? Is city matching exact or normalized?
14. **Error conventions:** Use 400 for all validation errors, or 422 for semantic validation? Should deletes return 200 envelope or 204?
15. **Deployment:** Target hosting, MongoDB provider/topology, required replica set, CI provider, and observability/log retention expectations?
16. **Seed credentials:** How should seeded admin passwords be provided securely in development and deployment? Seed data must not ship reusable production credentials.
17. **Dashboard revenue:** Count gross order totals, paid amounts, or delivered orders only? Which timezone defines “today”?
18. **API detail payload:** Should restaurant detail embed all categories and menu items, or return a compact restaurant and separate paginated catalog endpoints?

## Approval gate

Backend implementation may proceed for approved decisions. The restaurant fee amount is set per restaurant at setup/update. Category deletion behavior, retention, coupon scope, multiple-admin assignment, overnight hours, and checkout idempotency remain open; they must be settled before the affected behavior is finalized.
