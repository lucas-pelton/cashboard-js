/** Any JSON record returned by the API. */
export type Record = { id?: number; [field: string]: any };
export type Query = { [param: string]: string | number | boolean | undefined | null };

/** CRUD accessor shared by every resource. */
export interface Resource {
  /** GET /{path}. Optional query params (page, filters). */
  list(query?: Query): Promise<Record[]>;
  /** GET /{path}/{id}. */
  get(id: number | string): Promise<Record>;
  /** POST /{path}. Body shape is wrapped by singular resource name, e.g. { time_entry: {...} }. */
  create(data: object): Promise<Record>;
  /** PUT /{path}/{id}. */
  update(id: number | string, data: object): Promise<Record>;
  /** DELETE /{path}/{id}. */
  delete(id: number | string): Promise<any>;
}

export interface CashboardOptions {
  /** Account subdomain: https://<subdomain>.cashboardapp.com */
  subdomain?: string;
  /** API key (sent as HTTP Basic username, password "X"). Required. */
  apiKey: string;
  /** Override the full base URL (default https://<subdomain>.cashboardapp.com/api/v1). */
  baseUrl?: string;
  /** Custom fetch implementation (testing, proxies). Defaults to global fetch. */
  fetch?: typeof fetch;
}

/** Thrown for any non-2xx response. */
export class CashboardError extends Error {
  status: number;
  /** Parsed response body (JSON or text). */
  body: any;
}

export class Cashboard {
  constructor(options: CashboardOptions);
  /** Client companies you bill. Referenced by projects, jobs and invoices. Endpoint: /companies */
  clients: Resource;
  /** People: team members and client contacts. Endpoint: /people */
  people: Resource;
  /** Projects grouping jobs, usually belonging to a client. Endpoint: /projects */
  projects: Resource;
  /** Billable jobs within a project. Endpoint: /jobs */
  jobs: Resource;
  /** Tasks / to-dos within jobs. Endpoint: /tasks */
  tasks: Resource;
  /** Logged time against a job or task. Endpoint: /time_entries */
  timeEntries: Resource;
  /** Expenses logged against projects/jobs. Endpoint: /expenses */
  expenses: Resource;
  /** Invoices sent to clients. Endpoint: /invoices */
  invoices: Resource;
  /** Estimates / quotes sent to clients. Endpoint: /estimates */
  estimates: Resource;
  /** Payments received against invoices. Endpoint: /payments */
  payments: Resource;
  /** Service catalog items used on time entries and invoices. Endpoint: /services */
  services: Resource;
  /** Product catalog items. Endpoint: /products */
  products: Resource;
  /** Tax rates applied to invoices. Endpoint: /taxes */
  taxes: Resource;
  /** Raw request for endpoints without an accessor. Path is relative to baseUrl, e.g. '/projects/1'. */
  request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, opts?: { query?: Query; body?: any }): Promise<any>;
  /** Machine-readable summary of all resources and methods. */
  describe(): { baseUrl: string; methods: object; resources: object };
}
export const RESOURCES: object;
export const METHODS: object;
export default Cashboard;
