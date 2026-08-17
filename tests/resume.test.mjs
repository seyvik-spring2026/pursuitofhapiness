import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.SEYVIK_TEST_BASE_URL ?? 'http://localhost:3001';

test('resume includes the Rho startup role', async () => {
  const response = await fetch(`${baseUrl}/resume`);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, />Startup</);
  assert.match(html, />GTM Startup Banking</);
  assert.match(html, />Rho</);
});
