# cashboard-js

Dependency-free client for the [Cashboard API](https://api.cashboardapp.com/), for Node.js (>=18) and Bun (ESM, built-in `fetch`).

```js
import { Cashboard } from 'cashboard-js';

const cb = new Cashboard({ subdomain: 'acme', apiKey: process.env.CASHBOARD_API_KEY });
const projects = await cb.projects.list({ page: 1 });
await cb.timeEntries.create({ /* fields per API docs */ });
```

For local testing, copy [`.env.example`](.env.example) to `.env` and set
`CASHBOARD_SUBDOMAIN` and `CASHBOARD_API_KEY`. Keep `.env` private.

Resources documented by the API (each has `list`, `get`, `create`, `update`, `delete` where supported): `account`, `clientContacts`, `clientCompanies`, `comments`, `documentTemplates`, `employees`, `estimates`, `expenses`, `invoiceLineItems`, `invoicePayments`, `invoices`, `lineItems`, `payments`, `projectAssignments`, `projects`, `projectLists`, and `timeEntries`. `clients` and `people` remain aliases for `clientCompanies` and `clientContacts`.
For anything else use `cb.request(method, path, { query, body })`. Failures throw `CashboardError` (`status`, `body`).
Auth is HTTP Basic with the account subdomain as the username and API key as the password; override the endpoint with `baseUrl` if needed.

## For coding agents
See [AGENTS.md](AGENTS.md), per-resource docs in [docs/](docs/), TypeScript types in `src/index.d.ts`, and `cb.describe()` at runtime.
