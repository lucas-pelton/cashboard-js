# cb.projects

Projects grouping jobs, usually belonging to a client.

API endpoint: `/projects`

| Method | HTTP | Notes |
|---|---|---|
| `cb.projects.list(query?)` | `GET /projects` | array of records; query params e.g. `page` |
| `cb.projects.get(id)` | `GET /projects/{id}` | one record |
| `cb.projects.create(data)` | `POST /projects` | JSON body |
| `cb.projects.update(id, data)` | `PUT /projects/{id}` | JSON body |
| `cb.projects.delete(id)` | `DELETE /projects/{id}` | |

Example:

```js
await cb.projects.list({ page: 1 })
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
