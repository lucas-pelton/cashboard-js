# cb.products

Product catalog items.

API endpoint: `/products`

| Method | HTTP | Notes |
|---|---|---|
| `cb.products.list(query?)` | `GET /products` | array of records; query params e.g. `page` |
| `cb.products.get(id)` | `GET /products/{id}` | one record |
| `cb.products.create(data)` | `POST /products` | JSON body |
| `cb.products.update(id, data)` | `PUT /products/{id}` | JSON body |
| `cb.products.delete(id)` | `DELETE /products/{id}` | |

Example:

```js
await cb.products.list()
```

Errors throw `CashboardError` (`.status`, `.body`). Field names: see https://api.cashboardapp.com/.
