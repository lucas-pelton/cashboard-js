import { RESOURCES, METHODS, ALIASES } from './resources.js';

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
  constructor(client, definition) {
    this.client = client;
    this.path = definition.path;
    this.createPath = definition.createPath || definition.path;
    this.singular = definition.singular;
    for (const [name, [method, path]] of Object.entries(definition.actions || {})) {
      this[name] = (id, body) => this.action(id, path, { method, ...(body === undefined ? {} : { body }) });
    }
  }
  /** GET /{path}. Resolves to an array of records. @param {object} [query] URL query params. */
  list(query) { return this.client.request('GET', `/${this.path}`, { query }); }
  /** GET /{path}/new. Returns the API's create template. */
  new() { return this.client.request('GET', `/${this.path}/new`); }
  /** GET /{path}/{id}. Resolves to one record. */
  get(id) {
    return this.client.request('GET', id === undefined ? `/${this.path}` : `/${this.path}/${encodeURIComponent(id)}`);
  }
  /** POST /{path} with JSON body `data`. */
  create(data) { return this.client.request('POST', `/${this.createPath}`, { body: this.wrap(data) }); }
  /** PUT /{path}/{id} with JSON body `data`. */
  update(id, data) { return this.client.request('PUT', `/${this.path}/${encodeURIComponent(id)}`, { body: this.wrap(data) }); }
  /** DELETE /{path}/{id}. */
  delete(id) { return this.client.request('DELETE', `/${this.path}/${encodeURIComponent(id)}`); }
  action(id, action, options) {
    const suffix = id === undefined ? `/${action}` : `/${encodeURIComponent(id)}/${action}`;
    return this.client.request(options?.method || 'GET', `/${this.path}${suffix}`, options);
  }
  wrap(data) {
    if (!this.singular || data === null || typeof data !== 'object' || Array.isArray(data)) return data;
    return Object.prototype.hasOwnProperty.call(data, this.singular) ? data : { [this.singular]: data };
  }
}

/** Cashboard API client. Construct with { subdomain, apiKey }; see README.md and AGENTS.md. */
export class Cashboard {
  /**
   * @param {{subdomain: string, apiKey: string, baseUrl?: string, fetch?: typeof fetch}} opts
   */
  constructor({ subdomain, apiKey, baseUrl, fetch: fetchImpl } = {}) {
    if (!apiKey) throw new TypeError('apiKey is required');
    if (!baseUrl && !subdomain) throw new TypeError('subdomain or baseUrl is required');
    this.baseUrl = (baseUrl || 'https://api.cashboardapp.com').replace(/\/+$/, '');
    if (!subdomain) throw new TypeError('subdomain is required');
    this.auth = 'Basic ' + Buffer.from(`${subdomain}:${apiKey}`).toString('base64');
    this.fetch = fetchImpl || globalThis.fetch;
    for (const [name, definition] of Object.entries(RESOURCES)) {
      this[name] = new Resource(this, definition);
    }
    for (const [alias, name] of Object.entries(ALIASES)) this[alias] = this[name];
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
    const headers = {
      Authorization: this.auth,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
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
