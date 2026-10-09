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

test('launch homepage identifies POH Media and offers a direct contact action', async () => {
  const html = await getHomepageHtml();
  assert.match(html, /<h1[^>]*>POH Media<\/h1>/);
  assert.match(html, /Films for people/);
  assert.match(html, /mailto:seyvikmagon@pohmedia\.co/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="approach"/);
});

test('hero headline keeps readable word boundaries independent of its layout', async () => {
  const html = await getHomepageHtml();
  const heading = html.match(/<h2[^>]*>(Films for people[\s\S]*?)<\/h2>/)?.[1];
  assert.ok(heading, 'storytelling headline renders');
  const text = heading.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(text, 'Films for people building something.');
});

test('homepage renders the requested selected-work project order', async () => {
  const html = await getHomepageHtml();
  const projectLinks = [
    '/projects/founder-storytelling',
    '/projects/rho-events',
    '/projects/cash-flows',
  ];
  const positions = projectLinks.map((href) => html.indexOf(`href="${href}"`));

  assert.ok(positions.every((position) => position >= 0), 'all three selected projects render');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.doesNotMatch(html, /href="\/projects\/truemed"/);
});

test('projects page renders Rho Events first', async () => {
  const html = await getPageHtml('/projects');
  const rhoPosition = html.indexOf('href="/projects/rho-events"');
  const truemedPosition = html.indexOf('href="/projects/truemed"');

  assert.ok(rhoPosition >= 0, 'Rho Events renders');
  assert.ok(truemedPosition >= 0, 'Truemed renders');
  assert.ok(rhoPosition < truemedPosition, 'Rho Events renders before Truemed');
});

test('projects page does not advertise the website source repository', async () => {
  const html = await getPageHtml('/projects');

  assert.doesNotMatch(html, /View Source on GitHub/);
  assert.doesNotMatch(html, /github\.com\/seyvik-spring2026\/pursuitofhapiness/);
});

test('Rho Events renders the approved copy, four videos, and real poster frames', async () => {
  const html = await getPageHtml('/projects/rho-events');
  const videos = html.match(/<video[^>]*>/g) ?? [];

  assert.match(html, /I shoot event storytelling videos across San Francisco, Boston, and New York with Rho/);
  assert.match(html, /95% of startup events don(?:'|&#x27;|’|&rsquo;)t receive media coverage/);
  assert.equal(videos.length, 4);
  for (const video of videos) {
    assert.match(video, /poster="\/project-posters\/rho-[^"]+\.jpg"/);
    assert.doesNotMatch(video, /video-placeholder/);
  }
});

test('homepage offers access to the complete project catalogue', async () => {
  const html = await getHomepageHtml();
  assert.match(html, /<a[^>]*href="\/projects"[^>]*>All projects /);
});

test('homepage introduces Seyvik as a San Francisco storyteller', async () => {
  const html = await getHomepageHtml();

  assert.match(html, /I(?:'|&#x27;)m a storyteller living in San Francisco\./);
  assert.match(html, /For the past two summers though I worked in finance/);
  assert.match(html, /most recently as a private credit analyst on Wall Street\./);
  assert.match(html, /When I was very young, I used to make movies about everything\./);
  assert.match(html, /I(?:'|&#x27;)ve started doing it again\./);
});

test('homepage links the human story and collaboration invitation', async () => {
  const html = await getHomepageHtml();
  assert.match(html, /<a[^>]*href="\/about"[^>]*>More about me /);
  assert.match(html, /<a[^>]*href="mailto:seyvikmagon@pohmedia\.co"[^>]*>Let(?:'|&#x27;)s work together /);
});

test('public contact links use the POH Media email address', async () => {
  const [homepage, contactPage] = await Promise.all([
    getHomepageHtml(),
    getPageHtml('/contact'),
  ]);

  for (const html of [homepage, contactPage]) {
    assert.match(html, /mailto:seyvikmagon@pohmedia\.co/);
    assert.doesNotMatch(html, /contact@seyvikmagon\.com/);
  }
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

test('homepage films show real stills and accessible play controls on the first render', async () => {
  const html = await getHomepageHtml();
  const previewVideos = (html.match(/<video[^>]*>/g) ?? []).filter(video => video.includes('muted preview'));
  assert.equal(previewVideos.length, 4, 'hero plus three selected-work previews render');
  for (const video of previewVideos) {
    assert.match(video, /poster="\/project-posters\/[^"]+\.jpg"/);
    assert.match(video, /muted=""/);
    assert.match(video, /playsInline=""/);
    assert.doesNotMatch(video, /autoPlay/);
  }
  assert.match(html, /<img[^>]*src="\/project-posters\/founder-krish-desieats\.jpg"[^>]*loading="eager"/);
  assert.equal((html.match(/aria-label="Watch [^"]+ film with sound"/g) ?? []).length, 4);
  assert.equal((html.match(/<dialog[^>]*aria-label="[^"]+ film player"/g) ?? []).length, 4);
  assert.match(html, /<video[^>]*controls=""/);
  assert.match(html, /aria-label="View Founder Storytelling Series project"/);
});

test('projects listing preserves its poster thumbnails and mobile fullscreen controls', async () => {
  const html = await getPageHtml('/projects');
  const cardVideos = html.match(/<video[^>]*>/g) ?? [];
  assert.ok(cardVideos.length > 0);
  for (const video of cardVideos) assert.match(video, /poster="[^"]+"/);
  assert.match(html, /aria-label="Play [^"]+ fullscreen"/);
  assert.match(html, /aria-label="View [^"]+ project"/);
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
