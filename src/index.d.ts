/** Any JSON record returned by the API. */
export type ApiRecord = { id?: number; [field: string]: any };
export type Query = { [param: string]: string | number | boolean | undefined | null };

/** CRUD accessor shared by every resource. */
export interface Resource {
  /** GET /{path}. Optional query params (page, filters). */
  list(query?: Query): Promise<ApiRecord[]>;
  /** GET /{path}/new. Fetch the API-provided template for creating a record. */
  new(): Promise<ApiRecord>;
  /** GET /{path}/{id}; omit id for singleton resources such as account. */
  get(id?: number | string): Promise<ApiRecord>;
  /** POST /{path}. Data is wrapped by the singular resource name unless already wrapped. */
  create(data: object): Promise<ApiRecord>;
  /** PUT /{path}/{id}. Data is wrapped by the singular resource name unless already wrapped. */
  update(id: number | string, data: object): Promise<ApiRecord>;
  /** DELETE /{path}/{id}. */
  delete(id: number | string): Promise<any>;
  /** Call a documented resource action, such as projects.toggleStatus(id, body). */
  action(id: number | string, action: string, options?: { method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; query?: Query; body?: any }): Promise<any>;
}

export interface CashboardOptions {
  /** Cashboard account subdomain, used as the HTTP Basic Auth username. */
  subdomain: string;
  /** API key (sent as HTTP Basic username, password "X"). Required. */
  apiKey: string;
  /** Override the API base URL (default https://api.cashboardapp.com). */
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
  account: Resource;
  clientContacts: Resource;
  clientCompanies: Resource;
  comments: Resource;
  documentTemplates: Resource;
  employees: Resource;
  estimates: Resource;
  expenses: Resource;
  invoiceLineItems: Resource;
  invoicePayments: Resource;
  invoices: Resource;
  lineItems: Resource;
  payments: Resource;
  projectAssignments: Resource;
  projects: Resource;
  projectLists: Resource;
  timeEntries: Resource;
  /** Alias for clientCompanies. */
  clients: Resource;
  /** Alias for clientContacts. */
  people: Resource;
  /** Raw request for endpoints without an accessor. Path is relative to baseUrl, e.g. '/projects/1'. */
  request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, opts?: { query?: Query; body?: any }): Promise<any>;
  /** Machine-readable summary of all resources and methods. */
  describe(): { baseUrl: string; methods: object; resources: object };
}
export const RESOURCES: object;
export const METHODS: object;
export default Cashboard;
