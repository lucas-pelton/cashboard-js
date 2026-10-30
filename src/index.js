import { RESOURCES, METHODS } from './resources.js';

export class CashboardError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'CashboardError';
    this.status = status;
    this.body = body;
  }
}

/** CRUD accessor for one API resource (e.g. `cb.projects`). See src/resources.js. */
class Resource {
  constructor(client, path) {
    this.client = client;
    this.path = path;
  }
  /** GET /{path}. Resolves to an array of records. @param {object} [query] URL query params. */
  list(query) { return this.client.request('GET', `/${this.path}`, { query }); }
  /** GET /{path}/{id}. Resolves to one record. */
  get(id) { return this.client.request('GET', `/${this.path}/${encodeURIComponent(id)}`); }
  /** POST /{path} with JSON body `data`. */
  create(data) { return this.client.request('POST', `/${this.path}`, { body: data }); }
  /** PUT /{path}/{id} with JSON body `data`. */
  update(id, data) { return this.client.request('PUT', `/${this.path}/${encodeURIComponent(id)}`, { body: data }); }
  /** DELETE /{path}/{id}. */
  delete(id) { return this.client.request('DELETE', `/${this.path}/${encodeURIComponent(id)}`); }
}

/** Cashboard API client. Construct with { subdomain, apiKey }; see README.md and AGENTS.md. */
export class Cashboard {
  /**
   * @param {{subdomain: string, apiKey: string, baseUrl?: string, fetch?: typeof fetch}} opts
   */
  constructor({ subdomain, apiKey, baseUrl, fetch: fetchImpl } = {}) {
    if (!apiKey) throw new TypeError('apiKey is required');
    if (!baseUrl && !subdomain) throw new TypeError('subdomain or baseUrl is required');
    this.baseUrl = (baseUrl || `https://${subdomain}.cashboardapp.com/api/v1`).replace(/\/+$/, '');
    this.auth = 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64');
    this.fetch = fetchImpl || globalThis.fetch;
    for (const [name, { path }] of Object.entries(RESOURCES)) {
      this[name] = new Resource(this, path);
    }
  }

  /** Machine-readable summary of every resource and method, for agents/tools. */
  describe() {
    return { baseUrl: this.baseUrl, methods: METHODS, resources: RESOURCES };
  }

  /**
   * Low-level call for endpoints without a resource accessor.
   * @param {'GET'|'POST'|'PUT'|'DELETE'} method
   * @param {string} path e.g. '/projects/1/jobs'
   * @returns {Promise<any>} parsed JSON (or null for empty body); throws CashboardError on non-2xx.
   */
  async request(method, path, { query, body } = {}) {
    const url = new URL(this.baseUrl + path);
    for (const [k, v] of Object.entries(query || {})) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
    const headers = { Authorization: this.auth, Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const res = await this.fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch { data = text; }
    }
    if (!res.ok) {
      throw new CashboardError(`Cashboard API ${method} ${path} failed: ${res.status}`, res.status, data);
    }
    return data;
  }
}

export { RESOURCES, METHODS };
export default Cashboard;
