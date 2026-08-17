import test from 'node:test';
import assert from 'node:assert/strict';

async function loadFullscreenHelper() {
  return import('../lib/videoFullscreen.mjs').catch(() => ({}));
}

function createVideo(overrides = {}) {
  const events = new EventTarget();
  return {
    muted: true,
    volume: 0,
    controls: false,
    currentTime: 12,
    playCalls: 0,
    fullscreenCalls: 0,
    addEventListener: events.addEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
    play() {
      this.playCalls += 1;
      return Promise.resolve();
    },
    requestFullscreen() {
      this.fullscreenCalls += 1;
      return Promise.resolve();
    },
    ...overrides,
  };
}

test('mobile fullscreen playback starts unmuted at full volume', async () => {
  const { playVideoFullscreen } = await loadFullscreenHelper();
  assert.equal(typeof playVideoFullscreen, 'function');
  const video = createVideo();

  await playVideoFullscreen(video);

  assert.equal(video.muted, false);
  assert.equal(video.volume, 1);
  assert.equal(video.controls, true);
  assert.equal(video.playCalls, 1);
  assert.equal(video.fullscreenCalls, 1);
});

test('fullscreen playback restores audio if the browser mutes the video', async () => {
  const { playVideoFullscreen } = await loadFullscreenHelper();
  assert.equal(typeof playVideoFullscreen, 'function');
  const video = createVideo();

  await playVideoFullscreen(video);
  video.muted = true;
  video.volume = 0;
  video.dispatchEvent(new Event('volumechange'));

  assert.equal(video.muted, false);
  assert.equal(video.volume, 1);
});

test('mobile fullscreen playback supports the iPhone fullscreen API', async () => {
  const { playVideoFullscreen } = await loadFullscreenHelper();
  assert.equal(typeof playVideoFullscreen, 'function');
  const video = createVideo({
    requestFullscreen: undefined,
    webkitFullscreenCalls: 0,
    webkitEnterFullscreen() {
      this.webkitFullscreenCalls += 1;
    },
  });

  await playVideoFullscreen(video);

  assert.equal(video.webkitFullscreenCalls, 1);
  assert.equal(video.muted, false);
  assert.equal(video.volume, 1);
});

test('audio lock ends when iPhone fullscreen playback closes', async () => {
  const { playVideoFullscreen } = await loadFullscreenHelper();
  const video = createVideo({
    requestFullscreen: undefined,
    webkitEnterFullscreen() {},
  });

  await playVideoFullscreen(video);
  video.dispatchEvent(new Event('webkitendfullscreen'));
  video.muted = true;
  video.volume = 0;
  video.dispatchEvent(new Event('volumechange'));

  assert.equal(video.muted, true);
  assert.equal(video.volume, 0);
});
