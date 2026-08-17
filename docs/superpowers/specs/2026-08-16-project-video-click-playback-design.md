# Project Video Click Playback Design

## Goal

Make clicks on a project-detail video toggle playback instead of forcing an audio or fullscreen action. Muted preview cards on the homepage and projects listing must keep their existing behavior.

## Scope

This change applies to videos rendered on `/projects/[slug]` after a visitor opens a project. It does not change homepage previews, project-list previews, their hover behavior, or their mobile activation behavior.

## Interaction

- Clicking the picture of a playing project video pauses it.
- Clicking the picture of a paused project video resumes it with sound.
- Clicking a different project video pauses and mutes the previously active video, then plays the selected video with sound.
- Project-detail clicks do not request fullscreen.
- Native video controls remain available.
- Videos entering and leaving the scroll viewport retain the existing autoplay, pause, and mute behavior.

## Implementation

Update the project page's video click handler to inspect the selected video element's real `paused` state. A playing video is paused immediately without changing its audio setting. A paused video becomes the active video, causes any other active video to pause and mute, is unmuted, and starts playback.

The project page will no longer call the fullscreen/audio-forcing helper from this click handler. The helper remains in use for preview-card flows that intentionally activate fullscreen playback on supported mobile browsers.

## Error Handling

If the selected video element is unavailable, the handler returns without changing state. Playback promise rejections are handled so a browser autoplay or media error does not create an unhandled promise rejection.

## Verification

Add a focused automated test around a small playback-toggle helper so the behavior can be exercised without a browser media implementation. Verify that:

- a playing video pauses and remains at its current mute setting;
- a paused video resumes unmuted;
- activating another video pauses and mutes the previous one; and
- toggling project playback never requests fullscreen.

Run the focused test, the existing video fullscreen tests, the existing site tests, and the production build.
