# cb.people

People: team members and client contacts.

API endpoint: `/people`

| Method | HTTP | Notes |
|---|---|---|
| `cb.people.list(query?)` | `GET /people` | array of records; query params e.g. `page` |
| `cb.people.get(id)` | `GET /people/{id}` | one record |
| `cb.people.create(data)` | `POST /people` | JSON body |
| `cb.people.update(id, data)` | `PUT /people/{id}` | JSON body |
| `cb.people.delete(id)` | `DELETE /people/{id}` | |

Example:

```js
await cb.people.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
