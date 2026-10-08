# Proposed REST API Contract

All paths use `/api`. JSON responses use `{ success, message, data }`; paginated responses use `{ success, message, data, pagination: { page, limit, total, totalPages } }`. Errors use `{ success: false, message, errors: [{ code, field?, details? }], requestId }`. Exact 400 versus 422 validation mapping remains to be decided. `page` defaults to 1 and `limit` to 20, with a proposed maximum of 100 pending approval.

`Public` means no token required. Authenticated role scopes assume a verified, active account. Restaurant ownership is enforced in addition to role checks.

## Authentication and users

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `POST /auth/register` | Public; customer only | name, email, password, phone; normalized unique email, password policy | 201 user-safe object + access token |
| `POST /auth/login` | Public, rate limited | email/password | 200 user-safe object + access token |
| `POST /auth/logout` | Authenticated | Revokes all existing tokens for the current user by incrementing token version | 200 |
| `GET /users/me` | Any authenticated role | Bearer token | 200 safe current user |
| `PATCH /users/me` | Any authenticated role | Allowlisted name/phone only | 200 safe updated user |
| `PATCH /users/change-password` | Any authenticated role | currentPassword, newPassword | 200; revokes existing tokens and requires login again |

## Restaurants

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `GET /restaurants` | Public | `page`, `limit`, `search`, `city`, `open`; only public active/nondeleted records | 200 paginated restaurants |
| `POST /restaurants` | Restaurant admin or super admin | restaurant fields including nonnegative integer `deliveryFeePaisa`, weekly `openingHours`, and IANA `timeZone`; owner assignment is server-controlled | 201 restaurant |
| `GET /restaurants/:restaurantId` | Public | valid ID; public view excludes inactive/private fields | 200 restaurant with categories/menu summary; response size strategy pending |
| `PATCH /restaurants/:restaurantId` | Assigned restaurant admin or super admin | allowlisted partial fields, including delivery fee and schedule | 200 restaurant |
| `DELETE /restaurants/:restaurantId` | Super admin; proposed soft delete/deactivate | valid ID; preserve orders | 200/204; choose contract |

## Categories

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `GET /restaurants/:restaurantId/categories` | Public | pagination optional; public active categories | 200 list |
| `POST /restaurants/:restaurantId/categories` | Assigned restaurant admin or super admin | name, description, image, sortOrder | 201 category |
| `GET /categories/:categoryId` | Public | valid ID; active/public view | 200 category |
| `PATCH /categories/:categoryId` | Assigned restaurant admin or super admin | allowlisted fields | 200 category |
| `DELETE /categories/:categoryId` | Assigned restaurant admin or super admin | behavior with existing menu items requires decision | 200/204 |

## Menu

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `GET /restaurants/:restaurantId/menu` | Public | `page`, `limit`, `category`, `search`, `minPrice`, `maxPrice`, `available`; validate range and category tenant | 200 paginated active menu |
| `POST /restaurants/:restaurantId/menu` | Assigned restaurant admin or super admin | category, name, price, optional discount/image/ingredients/preparation time | 201 item |
| `GET /menu/:menuItemId` | Public | valid ID; respect restaurant/item visibility | 200 item |
| `PATCH /menu/:menuItemId` | Assigned restaurant admin or super admin | allowlisted fields; price constraints | 200 item |
| `DELETE /menu/:menuItemId` | Assigned restaurant admin or super admin | soft-delete/deactivate; preserve order snapshots | 200/204 |
| `PATCH /menu/:menuItemId/availability` | Assigned restaurant admin or super admin | `{ isAvailable: boolean }` | 200 item |

## Cart

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `GET /cart` | Customer | none | 200 cart with server-computed current price summary |
| `POST /cart/items` | Customer | `{ menuItemId, quantity }`; positive integer; server validates availability and single restaurant rule | 200 cart |
| `PATCH /cart/items/:menuItemId` | Customer | `{ quantity }`; positive integer | 200 cart |
| `DELETE /cart/items/:menuItemId` | Customer | valid item ID | 200 cart |
| `DELETE /cart` | Customer | none | 200 empty cart |

## Orders

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `POST /orders` | Customer | delivery address, phone, payment method, notes, optional agreed idempotency key; no client prices/totals | 201 order snapshot |
| `GET /orders/my-orders` | Customer | page, limit, status filter | 200 paginated own orders |
| `GET /orders/:orderId` | Customer owner, assigned restaurant admin, or super admin | valid ID and scoped authorization | 200 order |
| `PATCH /orders/:orderId/cancel` | Customer owner; super admin policy pending | optional reason; only allowed pre-fulfillment states | 200 updated order or 409 |
| `PATCH /orders/:orderId/status` | Assigned restaurant admin or super admin | `{ status }`; sequential transition and scope validation; marking `delivered` also marks cash payment `paid` atomically | 200 updated order |
| `GET /restaurants/:restaurantId/orders` | Assigned restaurant admin or super admin | page, limit, status, `from`, `to`, order-number search | 200 paginated orders |

## Administration

| Method / path | Access | Inputs and validation | Success |
| --- | --- | --- | --- |
| `GET /admin/users` | Super admin | page, limit, search, role, status | 200 paginated safe users |
| `PATCH /admin/users/:userId/status` | Super admin | `{ status: active\|blocked }`; prevent unsafe self-lockout policy pending | 200 user |
| `GET /admin/restaurants` | Super admin | page, limit, search, city, active | 200 paginated restaurants |
| `GET /admin/orders` | Super admin | page, limit, status, date range, restaurant | 200 paginated orders |
| `GET /admin/dashboard` | Super admin | optional bounded date range | 200 statistics; revenue definition pending |

## Common errors

`400` malformed request/ID, `401` missing/invalid/expired token, `403` valid identity without permission, `404` absent or intentionally undisclosed resource, `409` duplicate email/invalid state/idempotency conflict, `422` semantically invalid values (if adopted), `429` rate limit, `500` unexpected failure. Error messages must not expose secrets or internal stack traces.

## API decisions still needed

Currency and minor-unit rules, response shape for restaurant detail, open status semantics, coupon/discount support, validation status mapping, delete response convention, idempotency key contract, and logout/session revocation strategy.
