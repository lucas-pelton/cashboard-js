# cb.services

Service catalog items used on time entries and invoices.

API endpoint: `/services`

| Method | HTTP | Notes |
|---|---|---|
| `cb.services.list(query?)` | `GET /services` | array of records; query params e.g. `page` |
| `cb.services.get(id)` | `GET /services/{id}` | one record |
| `cb.services.create(data)` | `POST /services` | JSON body |
| `cb.services.update(id, data)` | `PUT /services/{id}` | JSON body |
| `cb.services.delete(id)` | `DELETE /services/{id}` | |

Example:

```js
await cb.services.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
