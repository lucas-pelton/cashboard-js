# cb.jobs

Billable jobs within a project.

API endpoint: `/jobs`

| Method | HTTP | Notes |
|---|---|---|
| `cb.jobs.list(query?)` | `GET /jobs` | array of records; query params e.g. `page` |
| `cb.jobs.get(id)` | `GET /jobs/{id}` | one record |
| `cb.jobs.create(data)` | `POST /jobs` | JSON body |
| `cb.jobs.update(id, data)` | `PUT /jobs/{id}` | JSON body |
| `cb.jobs.delete(id)` | `DELETE /jobs/{id}` | |

Example:

```js
await cb.jobs.get(42)
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
