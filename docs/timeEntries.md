# cb.timeEntries

Logged time against a job or task.

API endpoint: `/time_entries`

| Method | HTTP | Notes |
|---|---|---|
| `cb.timeEntries.list(query?)` | `GET /time_entries` | array of records; query params e.g. `page` |
| `cb.timeEntries.get(id)` | `GET /time_entries/{id}` | one record |
| `cb.timeEntries.create(data)` | `POST /time_entries` | JSON body |
| `cb.timeEntries.update(id, data)` | `PUT /time_entries/{id}` | JSON body |
| `cb.timeEntries.delete(id)` | `DELETE /time_entries/{id}` | |

Example:

```js
await cb.timeEntries.create({ time_entry: { job_id: 42, hours: 1.5 } })
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
