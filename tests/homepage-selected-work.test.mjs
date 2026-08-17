import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.SEYVIK_TEST_BASE_URL ?? 'http://localhost:3001';

async function getHomepageHtml() {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  return response.text();
}

async function getPageHtml(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200);
  return response.text();
}

test('homepage renders the requested selected-work project order', async () => {
  const html = await getHomepageHtml();
  const projectLinks = [
    '/projects/founder-storytelling',
    '/projects/arcangel',
    '/projects/truemed',
    '/projects/cash-flows',
  ];
  const positions = projectLinks.map((href) => html.indexOf(`href="${href}"`));

  assert.ok(positions.every((position) => position >= 0), 'all four selected projects render');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('homepage renders a monospaced All Projects pill below selected work', async () => {
  const html = await getHomepageHtml();
  const anchor = html.match(/<a[^>]*href="\/projects"[^>]*>All Projects →<\/a>/)?.[0];

  assert.ok(anchor, 'All Projects link renders');
  assert.match(anchor, /font-mono/);
  assert.match(anchor, /rounded-full/);
  assert.match(anchor, /bg-black/);
});

test('homepage introduces Seyvik as a San Francisco storyteller', async () => {
  const html = await getHomepageHtml();

  assert.match(html, /I(?:'|&#x27;)m a storyteller living in San Francisco\./);
  assert.match(html, /For the past two summers though I worked in finance/);
  assert.match(html, /most recently as a private credit analyst on Wall Street\./);
  assert.match(html, /When I was very young, I used to make movies about everything\./);
  assert.match(html, /I(?:'|&#x27;)ve started doing it again\./);
});

test('homepage keeps More about me as an understated text link with an arrow', async () => {
  const html = await getHomepageHtml();
  const moreAbout = html.match(/<a[^>]*href="\/about"[^>]*>More about me →<\/a>/)?.[0];

  assert.ok(moreAbout, 'More about me link renders');
  assert.match(moreAbout, /opacity-60/);
  assert.doesNotMatch(moreAbout, /font-mono|rounded-full|bg-black|text-white/);
});

test('homepage renders Let’s work together as a matching pill', async () => {
  const html = await getHomepageHtml();
  const workTogether = html.match(
    /<a[^>]*href="mailto:contact@seyvikmagon\.com"[^>]*>Let(?:'|&#x27;)s work together<\/a>/,
  )?.[0];

  assert.ok(workTogether, 'Let’s work together link renders');
  assert.match(workTogether, /font-mono/);
  assert.match(workTogether, /rounded-full/);
  assert.match(workTogether, /bg-black/);
  assert.match(workTogether, /text-white/);
});

test('project cards render their video stills in color on every listing page', async () => {
  const [homepage, projectsPage] = await Promise.all([
    getHomepageHtml(),
    getPageHtml('/projects'),
  ]);

  for (const html of [homepage, projectsPage]) {
    const cardVideos = html.match(/<video[^>]*>/g) ?? [];
    assert.ok(cardVideos.length > 0, 'project card videos render');
    for (const video of cardVideos) {
      assert.doesNotMatch(video, /(?:^|\s)grayscale(?:\s|$)/);
      assert.doesNotMatch(video, /group-hover:grayscale-0/);
    }
  }
});

test('project cards expose poster thumbnails and separate mobile fullscreen controls', async () => {
  const [homepage, projectsPage] = await Promise.all([
    getHomepageHtml(),
    getPageHtml('/projects'),
  ]);

  for (const html of [homepage, projectsPage]) {
    const cardVideos = html.match(/<video[^>]*>/g) ?? [];
    assert.ok(cardVideos.length > 0, 'project card videos render');
    for (const video of cardVideos) {
      assert.match(video, /poster="[^"]+"/);
    }

    assert.match(html, /aria-label="Play [^"]+ fullscreen"/);
    assert.match(html, /aria-label="View [^"]+ project"/);
  }
});

test('project detail videos expose poster thumbnails', async () => {
  const html = await getPageHtml('/projects/truemed');
  const videos = html.match(/<video[^>]*>/g) ?? [];
  assert.ok(videos.length > 0, 'project detail videos render');
  for (const video of videos) {
    assert.match(video, /poster="[^"]+"/);
  }
});

test('about-page videos expose poster thumbnails', async () => {
  const html = await getPageHtml('/about');
  const videos = html.match(/<video[^>]*>/g) ?? [];
  assert.ok(videos.length > 0, 'about-page videos render');
  for (const video of videos) {
    assert.match(video, /poster="[^"]+"/);
  }
});
