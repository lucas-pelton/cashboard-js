# `cb.estimates`

Estimates at `/estimates`. Supports CRUD plus `toggleStatus(id)`, `lineItems(id)`, `lineItemTasks(id)`, `lineItemProducts(id)`, and `lineItemCustoms(id)`.

| Method | HTTP | Notes |
|---|---|---|
| `cb.estimates.list(query?)` | `GET /estimates` | array of records; query params e.g. `page` |
| `cb.estimates.get(id)` | `GET /estimates/{id}` | one record |
| `cb.estimates.create(data)` | `POST /estimates` | JSON body |
| `cb.estimates.update(id, data)` | `PUT /estimates/{id}` | JSON body |
| `cb.estimates.delete(id)` | `DELETE /estimates/{id}` | |

Example:

```js
await cb.estimates.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
