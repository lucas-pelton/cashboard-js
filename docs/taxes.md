# cb.taxes

Tax rates applied to invoices.

API endpoint: `/taxes`

| Method | HTTP | Notes |
|---|---|---|
| `cb.taxes.list(query?)` | `GET /taxes` | array of records; query params e.g. `page` |
| `cb.taxes.get(id)` | `GET /taxes/{id}` | one record |
| `cb.taxes.create(data)` | `POST /taxes` | JSON body |
| `cb.taxes.update(id, data)` | `PUT /taxes/{id}` | JSON body |
| `cb.taxes.delete(id)` | `DELETE /taxes/{id}` | |

Example:

```js
await cb.taxes.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
