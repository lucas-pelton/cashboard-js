# Using cashboard-js (guide for coding agents)

Client for the Cashboard API. ESM only; Node >=18 / Bun; no dependencies. Types: `src/index.d.ts`.

```js
import { Cashboard, CashboardError } from 'cashboard-js';
const cb = new Cashboard({ subdomain: 'acme', apiKey: process.env.CASHBOARD_API_KEY });
```

- Every resource (`clients, people, projects, jobs, tasks, timeEntries, expenses, invoices, estimates, payments, services, products, taxes`) has `list(query?) get(id) create(data) update(id, data) delete(id)`. Per-resource docs: `docs/<resource>.md`.
- `clients` -> `/companies`, `timeEntries` -> `/time_entries`.
- Anything else: `cb.request('GET', '/path', { query, body })`.
- Runtime introspection: `cb.describe()` returns all resources, paths, descriptions and methods.
- Auth: HTTP Basic, API key as username, password `X`. Never hard-code the key.
- Errors: non-2xx throws `CashboardError` with `status` and parsed `body`. Empty responses resolve to `null`.
- Create/update bodies are JSON; Cashboard typically wraps fields under the singular resource name (e.g. `{ time_entry: {...} }`). Confirm against https://api.cashboardapp.com/.
- Metadata lives in `src/resources.js`; when adding a resource, update it, `src/index.d.ts`, and `docs/`.
