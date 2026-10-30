# cb.tasks

Tasks / to-dos within jobs.

API endpoint: `/tasks`

| Method | HTTP | Notes |
|---|---|---|
| `cb.tasks.list(query?)` | `GET /tasks` | array of records; query params e.g. `page` |
| `cb.tasks.get(id)` | `GET /tasks/{id}` | one record |
| `cb.tasks.create(data)` | `POST /tasks` | JSON body |
| `cb.tasks.update(id, data)` | `PUT /tasks/{id}` | JSON body |
| `cb.tasks.delete(id)` | `DELETE /tasks/{id}` | |

Example:

```js
await cb.tasks.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
