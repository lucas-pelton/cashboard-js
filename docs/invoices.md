# `cb.invoices`

Invoices at `/invoices`. Supports CRUD plus `importUninvoicedItems(id, body)` and `lineItems(id)`.

| Method | HTTP | Notes |
|---|---|---|
| `cb.invoices.list(query?)` | `GET /invoices` | array of records; query params e.g. `page` |
| `cb.invoices.get(id)` | `GET /invoices/{id}` | one record |
| `cb.invoices.create(data)` | `POST /invoices` | JSON body |
| `cb.invoices.update(id, data)` | `PUT /invoices/{id}` | JSON body |
| `cb.invoices.delete(id)` | `DELETE /invoices/{id}` | |

Example:

```js
await cb.invoices.get(7)
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
