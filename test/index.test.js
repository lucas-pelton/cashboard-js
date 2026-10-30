import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Cashboard, CashboardError } from '../src/index.js';

function mock(status, body) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return { ok: status < 400, status, text: async () => (body === undefined ? '' : JSON.stringify(body)) };
  };
  return { calls, fetch };
}

test('lists with auth and query', async () => {
  const m = mock(200, [{ id: 1 }]);
  const c = new Cashboard({ subdomain: 'acme', apiKey: 'k', fetch: m.fetch });
  assert.deepEqual(await c.projects.list({ page: 2 }), [{ id: 1 }]);
  assert.equal(m.calls[0].url, 'https://api.cashboardapp.com/projects?page=2');
  assert.equal(m.calls[0].init.headers.Authorization, 'Basic ' + Buffer.from('acme:k').toString('base64'));
});

test('create wraps an unwrapped JSON body', async () => {
  const m = mock(201, { id: 5 });
  const c = new Cashboard({ subdomain: 'a', apiKey: 'k', fetch: m.fetch });
  await c.timeEntries.create({ hours: 1 });
  assert.equal(m.calls[0].init.method, 'POST');
  assert.equal(m.calls[0].init.body, '{"time_entry":{"hours":1}}');
});

test('create preserves an already wrapped JSON body', async () => {
  const m = mock(201, { id: 5 });
  const c = new Cashboard({ subdomain: 'a', apiKey: 'k', fetch: m.fetch });
  await c.timeEntries.create({ time_entry: { minutes: 15 } });
  assert.equal(m.calls[0].init.body, '{"time_entry":{"minutes":15}}');
});

test('new fetches the API create template', async () => {
  const m = mock(200, { minutes: 0 });
  const c = new Cashboard({ subdomain: 'a', apiKey: 'k', fetch: m.fetch });
  assert.deepEqual(await c.timeEntries.new(), { minutes: 0 });
  assert.equal(m.calls[0].url, 'https://api.cashboardapp.com/time_entries/new');
  assert.equal(m.calls[0].init.method, 'GET');
});

test('errors throw CashboardError', async () => {
  const m = mock(404, { error: 'nope' });
  const c = new Cashboard({ subdomain: 'a', apiKey: 'k', fetch: m.fetch });
  await assert.rejects(c.clients.get(1), (e) => e instanceof CashboardError && e.status === 404);
});

test('describe lists resources and every resource has docs', async () => {
  const { existsSync } = await import('node:fs');
  const c = new Cashboard({ subdomain: 'a', apiKey: 'k' });
  const d = c.describe();
  for (const name of Object.keys(d.resources)) {
    assert.ok(c[name], name);
    assert.ok(existsSync(new URL(`../docs/${name}.md`, import.meta.url)), name);
  }
});
