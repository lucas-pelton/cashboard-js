# `cb.timeEntries`

Time entries at `/time_entries`. Supports CRUD and `toggleTimer(id)`.

| Method | HTTP | Notes |
|---|---|---|
| `cb.timeEntries.list(query?)` | `GET /time_entries` | array of records; query params e.g. `page` |
| `cb.timeEntries.get(id)` | `GET /time_entries/{id}` | one record |
| `cb.timeEntries.new()` | `GET /time_entries/new` | API-provided create template |
| `cb.timeEntries.create(data)` | `POST /time_entries` | body is wrapped as `{ time_entry: data }` |
| `cb.timeEntries.update(id, data)` | `PUT /time_entries/{id}` | body is wrapped as `{ time_entry: data }` |
| `cb.timeEntries.delete(id)` | `DELETE /time_entries/{id}` | |

Example:

```js
await cb.timeEntries.create({ line_item_id: 820365, minutes: 15, is_billable: false })
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.

## Creating an entry

Time entries belong to a project line item (task), found via `cb.projects.lineItems(projectId)`. The client wraps unwrapped create/update data in `time_entry`; already wrapped data is preserved. `new()` returns the server's flat template so callers can inspect valid fields before creating:

```js
const template = await cb.timeEntries.new();
await cb.timeEntries.create({
  ...template,
  line_item_id: 820365,
  minutes: 15,
  is_billable: false,
  description: '...',
});
```

Blank `minutes` starts a running timer. The API's create template is not itself wrapped; the client wraps it when sending it through `create()`.
