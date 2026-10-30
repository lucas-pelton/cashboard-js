# cashboard-js

Dependency-free client for the [Cashboard API](https://api.cashboardapp.com/), for Node.js (>=18) and Bun (ESM, built-in `fetch`).

```js
import { Cashboard } from 'cashboard-js';

const cb = new Cashboard({ subdomain: 'acme', apiKey: process.env.CASHBOARD_API_KEY });
const projects = await cb.projects.list({ page: 1 });
await cb.timeEntries.create({ /* fields per API docs */ });
```

Resources (each has `list`, `get`, `create`, `update`, `delete`): `clients`, `people`, `projects`, `jobs`, `tasks`, `timeEntries`, `expenses`, `invoices`, `estimates`, `payments`, `services`, `products`, `taxes`.
For anything else use `cb.request(method, path, { query, body })`. Failures throw `CashboardError` (`status`, `body`).
Auth is HTTP Basic with the API key; override the endpoint with `baseUrl` if needed.

## For coding agents
See [AGENTS.md](AGENTS.md), per-resource docs in [docs/](docs/), TypeScript types in `src/index.d.ts`, and `cb.describe()` at runtime.
