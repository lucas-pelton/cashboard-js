# cb.payments

Payments received against invoices.

API endpoint: `/payments`

| Method | HTTP | Notes |
|---|---|---|
| `cb.payments.list(query?)` | `GET /payments` | array of records; query params e.g. `page` |
| `cb.payments.get(id)` | `GET /payments/{id}` | one record |
| `cb.payments.create(data)` | `POST /payments` | JSON body |
| `cb.payments.update(id, data)` | `PUT /payments/{id}` | JSON body |
| `cb.payments.delete(id)` | `DELETE /payments/{id}` | |

Example:

```js
await cb.payments.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
