'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/app/poh-home.module.css';

interface PohFilmProps {
  src: string;
  poster: string;
  title: string;
  projectHref: string;
  priority?: boolean;
}

export default function PohFilm({ src, poster, title, projectHref, priority = false }: PohFilmProps) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [playerFailed, setPlayerFailed] = useState(false);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => {
      if (inView && !motion.matches && !manuallyPaused.current && !opened && !document.hidden) {
        preview.muted = true;
        void preview.play().catch(() => {});
      } else {
        preview.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.35 });
    observer.observe(preview);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      preview.pause();
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const dialog = dialogRef.current;
    const player = playerRef.current;
    if (!dialog || !player) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    player.muted = false;
    void player.play().catch(() => {});
    return () => {
      player.pause();
      document.body.style.overflow = previousOverflow;
    };
  }, [opened]);

  function togglePreview() {
    const preview = previewRef.current;
    if (!preview) return;
    if (playing) {
      manuallyPaused.current = true;
      preview.pause();
    } else {
      manuallyPaused.current = false;
      preview.muted = true;
      void preview.play().catch(() => {});
    }
  }

  return (
    <div className={styles.film}>
      {/* The real still remains beneath the video if playback is unavailable. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={`Still from ${title}`} className={styles.poster} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
      <video
        ref={previewRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? 'metadata' : 'none'}
        aria-label={`${title} muted preview`}
        className={`${styles.preview} ${previewFailed ? styles.failedPreview : ''}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPreviewFailed(true)}
      />
      {!previewFailed && <button type="button" className={styles.previewToggle} onClick={togglePreview} aria-label={`${playing ? 'Pause' : 'Play'} ${title} preview`}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>
      </button>}
      <button type="button" className={styles.watchFilm} onClick={() => { setPlayerFailed(false); setOpened(true); }} aria-label={`Watch ${title} film with sound`} aria-haspopup="dialog">
        <span className={styles.playIcon} aria-hidden="true">▶</span>
        <span>Watch film</span>
        <span aria-hidden="true">↗</span>
      </button>
      <dialog ref={dialogRef} className={styles.filmDialog} aria-label={`${title} film player`} onClose={() => setOpened(false)}>
        <div className={styles.dialogTop}>
          <p>{title}</p>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label={`Close ${title} film`} autoFocus>Close <span aria-hidden="true">×</span></button>
        </div>
        <video ref={playerRef} src={opened ? src : undefined} poster={poster} controls playsInline preload="none" className={styles.fullFilm} onError={() => setPlayerFailed(true)} aria-label={title} />
        {playerFailed && <p className={styles.playbackError}>This film couldn&apos;t load. <Link href={projectHref}>Explore the project →</Link></p>}
        <Link className={styles.dialogProject} href={projectHref} onClick={() => dialogRef.current?.close()}>View project and more films →</Link>
      </dialog>
    </div>
  );
}
