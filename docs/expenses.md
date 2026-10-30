# `cb.expenses`

Expenses at `/expenses`. Supports list, create, get, update, and delete.

| Method | HTTP | Notes |
|---|---|---|
| `cb.expenses.list(query?)` | `GET /expenses` | array of records; query params e.g. `page` |
| `cb.expenses.get(id)` | `GET /expenses/{id}` | one record |
| `cb.expenses.create(data)` | `POST /expenses` | JSON body |
| `cb.expenses.update(id, data)` | `PUT /expenses/{id}` | JSON body |
| `cb.expenses.delete(id)` | `DELETE /expenses/{id}` | |

Example:

```js
await cb.expenses.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
