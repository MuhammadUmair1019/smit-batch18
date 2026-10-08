# Decisions and Open Questions

## Proposed defaults for review

These are recommendations, not approved business rules.

| Topic | Proposed default | Why it is still a decision |
| --- | --- | --- |
| Architecture/stack | Modular monolith; Node.js + Express + TypeScript + MongoDB/Mongoose | Requirements suggest this stack but allow alternatives; coursework/runtime compatibility is unknown. |
| Public registration | Creates customer only | Explicitly required; admins are provisioned by super admin/seed. |
| Restaurant admin scope | `ownerUserId` references one user; ownership checks on every operation | Multiple admins per restaurant and one admin across multiple restaurants are unspecified. |
| Currency | Integer minor units, one configured currency per deployment | Currency and rounding rules are unspecified; sample prices suggest but do not prove PKR. |
| Cart price | Store item IDs/quantities; calculate current prices on read and checkout | Requirement says never trust client price, but whether to show price-change warnings is unspecified. |
| Cart restaurant switch | Reject adding a second restaurant and ask customer to clear/switch cart | Requirement says one restaurant at a time but not replacement behavior. |
| Checkout | Atomic order creation + cart clear via MongoDB transaction; idempotency key | Transactions require replica set; retry/concurrency behavior unspecified. |
| Discounts | No coupons in initial scope; `discountPrice` is a menu price only | Checkout says apply valid discounts, while coupons are marked optional and no coupon API is defined. |
| Delivery fee | Configured flat fee or restaurant-level value, to be chosen | Fee algorithm, zones, minimums, taxes, and who sets the fee are unspecified. |
| Payment | Cash only initially; online payment deferred | Only cash appears in request example; payment provider/confirmation/refund lifecycle are absent. |
| Restaurant open state | Derive from weekly opening hours + timezone, with manual override only if needed | Model shows opening/closing time and `isOpen`, but schedules, overnight hours, closures, and manual override are undefined. |
| Deletion | Deactivate/soft-delete restaurants/categories/items; preserve orders | Categories with menu items and retention/privacy requirements are unspecified. |
| Cancellation | Customer may cancel `pending` and perhaps `confirmed`; admin may reject; terminal states immutable | Requirements say “such as pending or confirmed” but don't settle exact rules, reason, or refund behavior. |
| Order transitions | `pending -> confirmed -> preparing -> ready -> out_for_delivery -> delivered`; rejection/cancel from allowed early states | Exact transition graph, skipped states, pickup orders, and who marks `delivered` are unspecified. |
| Auth/session | Short-lived JWT access token; token-version revocation on password change/block; logout semantics to choose | Requirements require logout endpoint and mention revocation only if supported. |
| Search | Mongo indexes/basic search initially; Atlas Search if relevance requirements justify it | Search language, typo tolerance, and expected catalog size are unknown. |
| Optional features | Exclude reviews/favorites/coupons/addresses/notifications from initial release | Explicitly labeled optional; each changes schema/API and timelines. |

## Questions to resolve before schema/API freeze

### Blocking business and data decisions

1. **Stack/runtime:** Approve Node.js + Express + TypeScript + MongoDB/Mongoose, or specify required JavaScript/runtime/version constraints?
2. **Currency and money:** Is this PKR only? Should all values use integer paisa? Are tax, service fee, or rounding rules required?
3. **Admin provisioning and ownership:** Who creates restaurant-admin accounts? Can a restaurant have multiple admins, and can one admin manage multiple restaurants?
4. **Delivery and checkout:** Is delivery the only fulfillment mode? How is delivery fee calculated, and where is it configured? Should checkout have an idempotency key?
5. **Discounts:** Does `discountPrice` fully define discounts for v1, or must coupons be part of checkout despite being listed as optional?
6. **Payments:** Is cash-on-delivery the only v1 method? What does `paymentStatus` mean for cash, and is any payment integration required?
7. **Cart switching:** When a customer adds an item from another restaurant, should the API reject, replace the cart after confirmation, or support multiple carts?
8. **Hours/open status:** Are opening hours weekly schedules with timezone and exceptions? Is `isOpen` derived, manual, or both?
9. **Order lifecycle:** Which exact transitions are allowed, who may cancel/reject, can restaurant admins cancel confirmed orders, and which role marks delivery complete?
10. **Soft deletion:** Should category deletion be blocked while it has active items, cascade-deactivate items, or allow hidden references? How long must user/order data be retained?
11. **Auth revocation:** Should logout revoke the current token immediately? What access-token lifetime and refresh-token/session model are wanted?

### Operational/API decisions

12. **Images:** Is Cloudinary required? Should the backend accept uploads or issue signed upload parameters? Allowed types, size limits, and cleanup behavior?
13. **Pagination/search:** Is page/limit sufficient? What maximum page size and search behavior are expected? Is city matching exact or normalized?
14. **Error conventions:** Use 400 for all validation errors, or 422 for semantic validation? Should deletes return 200 envelope or 204?
15. **Deployment:** Target hosting, MongoDB provider/topology, required replica set, CI provider, and observability/log retention expectations?
16. **Seed credentials:** How should seeded admin passwords be provided securely in development and deployment? Seed data must not ship reusable production credentials.
17. **Dashboard revenue:** Count gross order totals, paid amounts, or delivered orders only? Which timezone defines “today”?
18. **API detail payload:** Should restaurant detail embed all categories and menu items, or return a compact restaurant and separate paginated catalog endpoints?

## Approval gate

No backend code, database schema, or migration should be created until the user approves the architecture and resolves or explicitly defers the blocking questions above. Once approved, revise the planning documents and execute `IMPLEMENTATION_PLAN.md` milestone by milestone.
