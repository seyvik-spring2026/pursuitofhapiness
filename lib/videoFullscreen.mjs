const audioLockedVideos = new WeakSet();
const fullscreenAudioVideos = new WeakSet();

function keepAudioOn(video) {
  video.muted = false;
  video.volume = 1;
}

function lockFullscreenAudio(video) {
  fullscreenAudioVideos.add(video);
  if (audioLockedVideos.has(video)) return;
  audioLockedVideos.add(video);

  for (const eventName of ['volumechange', 'play', 'webkitbeginfullscreen']) {
    video.addEventListener(eventName, () => {
      if (fullscreenAudioVideos.has(video)) keepAudioOn(video);
    });
  }

  video.addEventListener('webkitendfullscreen', () => fullscreenAudioVideos.delete(video));

  const ownerDocument = video.ownerDocument;
  ownerDocument?.addEventListener('fullscreenchange', () => {
    if (ownerDocument.fullscreenElement === video) {
      keepAudioOn(video);
    } else {
      fullscreenAudioVideos.delete(video);
    }
  });
}

export async function playVideoFullscreen(video) {
  keepAudioOn(video);
  video.controls = true;
  lockFullscreenAudio(video);

  const playback = video.play();
  let fullscreen;

  if (typeof video.webkitEnterFullscreen === 'function') {
    video.webkitEnterFullscreen();
  } else if (typeof video.requestFullscreen === 'function') {
    fullscreen = video.requestFullscreen();
  }

  await Promise.allSettled([playback, fullscreen].filter(Boolean));
  keepAudioOn(video);
}
