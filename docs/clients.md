# `cb.clients`

Alias for [`cb.clientCompanies`](./clientCompanies.md), backed by `/client_companies`.

| Method | HTTP | Notes |
|---|---|---|
| `cb.clients.list(query?)` | `GET /companies` | array of records; query params e.g. `page` |
| `cb.clients.get(id)` | `GET /companies/{id}` | one record |
| `cb.clients.create(data)` | `POST /companies` | JSON body |
| `cb.clients.update(id, data)` | `PUT /companies/{id}` | JSON body |
| `cb.clients.delete(id)` | `DELETE /companies/{id}` | |

Example:

```js
await cb.clients.create({ company: { name: 'Acme Inc' } })
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
