import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.SEYVIK_TEST_BASE_URL ?? 'http://localhost:3001';

test('resume places Startup above Finance and shows the updated media dates', async () => {
  const response = await fetch(`${baseUrl}/resume`);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, />Startup</);
  assert.match(html, />GTM Startup Banking</);
  assert.match(html, />Rho</);
  assert.ok(html.indexOf('>Startup<') < html.indexOf('>Finance<'));
  assert.match(html, />Feb-Apr 2026</);
  assert.match(html, />Apr-May 2026</);
});
