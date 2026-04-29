'use client';

import { useRef, useState, useEffect } from 'react';

interface VideoCardProps {
  src?: string;
  label?: string;
  aspect?: '4/5' | '9/16';
  maxWidth?: string;
  /** "preview" = muted hover-to-play (cards). "full" = audio + native controls (project pages). */
  mode?: 'preview' | 'full';
}

export default function VideoCard({
  src,
  label,
  aspect = '9/16',
  maxWidth,
  mode = 'preview',
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activated, setActivated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Sync playing state with video element events
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    vid.addEventListener('play', onPlay);
    vid.addEventListener('pause', onPause);
    return () => {
      vid.removeEventListener('play', onPlay);
      vid.removeEventListener('pause', onPause);
    };
  }, [activated]);

  // ── Preview mode: muted hover-to-play ──────────────────────
  function handlePreviewEnter() {
    if (mode !== 'preview' || isMobile || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }

  function handlePreviewLeave() {
    if (mode !== 'preview' || isMobile || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }

  function handlePreviewTap() {
    if (mode !== 'preview' || !isMobile || !videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  // ── Full mode: click to activate with audio + controls ─────
  function handleFullActivate() {
    if (mode !== 'full' || !videoRef.current) return;
    if (!activated) {
      setActivated(true);
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  // ── No video source: placeholder ───────────────────────────
  if (!src) {
    return (
      <div
        className="relative w-full rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          aspectRatio: aspect === '4/5' ? '4/5' : '9/16',
          maxWidth: maxWidth,
          backgroundColor: 'rgba(128,128,128,0.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10" />
        <div className="relative z-10 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        {label && (
          <span className="absolute bottom-3 left-3 font-mono text-[10px] opacity-30 uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    );
  }

  const aspectClass = aspect === '4/5' ? 'aspect-[4/5]' : 'aspect-[9/16]';
  const isPreview = mode === 'preview';

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-lg overflow-hidden cursor-pointer group`}
      style={{ maxWidth, backgroundColor: 'rgba(0,0,0,0.9)' }}
      onMouseEnter={isPreview ? handlePreviewEnter : undefined}
      onMouseLeave={isPreview ? handlePreviewLeave : undefined}
      onClick={isPreview ? handlePreviewTap : handleFullActivate}
    >
      <video
        ref={videoRef}
        src={src}
        muted={isPreview || !activated}
        loop={isPreview}
        playsInline
        preload="metadata"
        controls={!isPreview && activated}
        controlsList="nodownload"
        className={`absolute inset-0 w-full h-full object-cover ${
          !isPreview && activated ? 'video-full-controls' : ''
        }`}
      />

      {/* Play overlay: visible when not playing (preview) or not yet activated (full) */}
      {(isPreview ? !playing : !activated) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Label */}
      {label && (
        <span
          className={`absolute bottom-3 left-3 font-mono text-[10px] text-white/50 uppercase tracking-wider transition-opacity duration-300 z-10 ${
            (isPreview && playing) || (!isPreview && activated) ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
