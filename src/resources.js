/**
 * Single source of truth for the resources exposed on a Cashboard client.
 * Used to build the client, to answer `cb.describe()`, and mirrored in index.d.ts / docs.
 * NOTE: endpoint paths and field names follow the Cashboard API docs
 * (https://api.cashboardapp.com/); verify against them if a call returns 404/422.
 */
export const RESOURCES = {
  clients: {
    path: 'companies',
    description: 'Client companies you bill. Referenced by projects, jobs and invoices.',
    example: "await cb.clients.create({ company: { name: 'Acme Inc' } })",
  },
  people: {
    path: 'people',
    description: 'People: team members and client contacts.',
    example: 'await cb.people.list()',
  },
  projects: {
    path: 'projects',
    description: 'Projects grouping jobs, usually belonging to a client.',
    example: 'await cb.projects.list({ page: 1 })',
  },
  jobs: {
    path: 'jobs',
    description: 'Billable jobs within a project.',
    example: 'await cb.jobs.get(42)',
  },
  tasks: {
    path: 'tasks',
    description: 'Tasks / to-dos within jobs.',
    example: 'await cb.tasks.list()',
  },
  timeEntries: {
    path: 'time_entries',
    description: 'Logged time against a job or task.',
    example: "await cb.timeEntries.create({ time_entry: { job_id: 42, hours: 1.5 } })",
  },
  expenses: {
    path: 'expenses',
    description: 'Expenses logged against projects/jobs.',
    example: 'await cb.expenses.list()',
  },
  invoices: {
    path: 'invoices',
    description: 'Invoices sent to clients.',
    example: 'await cb.invoices.get(7)',
  },
  estimates: {
    path: 'estimates',
    description: 'Estimates / quotes sent to clients.',
    example: 'await cb.estimates.list()',
  },
  payments: {
    path: 'payments',
    description: 'Payments received against invoices.',
    example: 'await cb.payments.list()',
  },
  services: {
    path: 'services',
    description: 'Service catalog items used on time entries and invoices.',
    example: 'await cb.services.list()',
  },
  products: {
    path: 'products',
    description: 'Product catalog items.',
    example: 'await cb.products.list()',
  },
  taxes: {
    path: 'taxes',
    description: 'Tax rates applied to invoices.',
    example: 'await cb.taxes.list()',
  },
};

/** Methods every resource exposes. */
export const METHODS = {
  list: { http: 'GET /{path}', args: '(query?: object)', returns: 'array of records', doc: 'List records. `query` becomes URL query params (e.g. page, filters).' },
  get: { http: 'GET /{path}/{id}', args: '(id)', returns: 'record', doc: 'Fetch one record by id.' },
  create: { http: 'POST /{path}', args: '(data: object)', returns: 'created record', doc: 'Create a record. `data` is sent as the JSON body.' },
  update: { http: 'PUT /{path}/{id}', args: '(id, data: object)', returns: 'updated record', doc: 'Update a record with the JSON body `data`.' },
  delete: { http: 'DELETE /{path}/{id}', args: '(id)', returns: 'null or API response', doc: 'Delete a record by id.' },
};
