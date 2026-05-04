'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/Lightbox';

const R2 = 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

// ─── Personal Videos (full list for the Reels viewer) ────────
const ALL_PERSONAL_VIDEOS = [
  { label: 'Day in the Life', src: `${R2}/Videos/personal/day-in-the-life-pivot.mp4` },
  { label: 'Pursuit of Happiness', src: `${R2}/Videos/personal/pursuit-of-hapiness.mp4` },
  { label: 'Intramural Soccer', src: `${R2}/Videos/personal/intramural-soccer.mp4` },
  { label: 'Esto es Miami', src: `${R2}/Videos/personal/esto-es-miami.mp4` },
  { label: 'Day in the Life OG', src: `${R2}/Videos/personal/day-in-the-life-og.mp4` },
  { label: 'Chinatown', src: `${R2}/Videos/personal/chinatown.mp4` },
];

// The 3 thumbnails shown on the page
const THUMBNAIL_VIDEOS = ALL_PERSONAL_VIDEOS.slice(0, 3);

// ─── Reels Viewer Overlay (rendered via Portal) ──────────────
function ReelsViewerContent({
  videos,
  startIndex,
  onClose,
}: {
  videos: { label: string; src: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Scroll to the start index on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ top: startIndex * container.clientHeight });
  }, [startIndex]);

  // IntersectionObserver for autoplay
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentIndex(i);
            vid.currentTime = 0;
            vid.muted = false;
            vid.play().catch(() => {
              vid.muted = true;
              vid.play().catch(() => {});
            });
          } else {
            vid.pause();
            vid.muted = true;
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(vid);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll + Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#000' }}>
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 10000,
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
      }}>
        {currentIndex + 1} / {videos.length}
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{ width: '100%', height: '100%', overflowY: 'auto', scrollSnapType: 'y mandatory' }}
      >
        {videos.map((video, i) => (
          <div
            key={i}
            style={{ scrollSnapAlign: 'start', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={video.src}
              muted
              loop
              playsInline
              preload="metadata"
              controls
              className="max-h-full w-auto object-contain"
              style={{ aspectRatio: '9/16', maxWidth: '100%', borderRadius: 0 }}
            />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="font-mono text-sm text-white/60 tracking-wide drop-shadow-lg">
                {video.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReelsViewer(props: { videos: { label: string; src: string }[]; startIndex: number; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(<ReelsViewerContent {...props} />, document.body);
}

// ─── Location Data ───────────────────────────────────────────
interface LocationData {
  name: string;
  illustration: string;
  photos: string[];
  videos?: string[];
}

const LOCATIONS: LocationData[] = [
  {
    name: 'Battery Park City, NYC',
    illustration: `${R2}/site-media/Entergalactic/battery_park-betterphoto.png`,
    photos: [
      `${R2}/site-media/batterypark-city/DSC_0913.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0920.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0925.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0939.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0959.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0979.JPG`,
      `${R2}/site-media/batterypark-city/DSC_0983.JPG`,
      `${R2}/site-media/batterypark-city/DSC_1008.JPG`,
      `${R2}/site-media/batterypark-city/DSC_1018.JPG`,
    ],
  },
  {
    name: 'Chelsea, NYC',
    illustration: `${R2}/site-media/Entergalactic/chelsea.png`,
    photos: [],
  },
  {
    name: 'Babson College',
    illustration: `${R2}/site-media/Entergalactic/babson-field.png`,
    photos: [
      `${R2}/site-media/babson/DSC_0837.JPG`,
      `${R2}/site-media/babson/DSC_0842.JPG`,
      `${R2}/site-media/babson/DSC_0848.JPG`,
      `${R2}/site-media/babson/DSC_0856.JPG`,
      `${R2}/site-media/babson/DSC_0862.JPG`,
      `${R2}/site-media/babson/IMG_3317.jpeg`,
      `${R2}/site-media/babson/P3240793.JPG`,
      `${R2}/site-media/babson/P3240798.JPG`,
      `${R2}/site-media/babson/P3310805.JPG`,
      `${R2}/site-media/babson/P4030811.JPG`,
      `${R2}/site-media/babson/P4030813.JPG`,
      `${R2}/site-media/babson/P4130020.JPG`,
    ],
  },
  {
    name: 'Madrid, Casa de Campo',
    illustration: `${R2}/site-media/Entergalactic/madrid-casa-de-camppo.png`,
    photos: [
      `${R2}/site-media/madrid/DSC07993.JPG`,
      `${R2}/site-media/madrid/IMG_0083.jpeg`,
      `${R2}/site-media/madrid/IMG_0263.jpeg`,
      `${R2}/site-media/madrid/IMG_0307.jpeg`,
      `${R2}/site-media/madrid/IMG_0418.jpeg`,
      `${R2}/site-media/madrid/IMG_0440.jpeg`,
      `${R2}/site-media/madrid/IMG_0744.jpeg`,
      `${R2}/site-media/madrid/IMG_0791.jpeg`,
      `${R2}/site-media/madrid/IMG_0936 (1).jpeg`,
      `${R2}/site-media/madrid/IMG_1632.jpeg`,
      `${R2}/site-media/madrid/IMG_1636.jpeg`,
      `${R2}/site-media/madrid/IMG_2913.jpeg`,
      `${R2}/site-media/madrid/IMG_3429.jpeg`,
      `${R2}/site-media/madrid/IMG_3468.jpeg`,
      `${R2}/site-media/madrid/IMG_3584.jpeg`,
      `${R2}/site-media/madrid/P1010128.JPG`,
    ],
  },
  {
    name: 'SF Chinatown',
    illustration: `${R2}/site-media/Entergalactic/chinatown.jpeg`,
    photos: [],
    videos: [
      `${R2}/site-media/sf/cali-day1.mp4`,
      `${R2}/site-media/sf/cali-day2.mp4`,
    ],
  },
  {
    name: 'Walton, Upstate New York',
    illustration: `${R2}/site-media/Entergalactic/walton-upstate-newyork.png`,
    photos: [
      `${R2}/site-media/upstate-newyork/IMG_0002.JPG`,
      `${R2}/site-media/upstate-newyork/IMG_0030.JPG`,
      `${R2}/site-media/upstate-newyork/IMG_0591.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_0593.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_2273.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_2351.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_2359.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_2868.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_3087.JPG`,
      `${R2}/site-media/upstate-newyork/IMG_6477.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_9401.jpeg`,
      `${R2}/site-media/upstate-newyork/IMG_9410.jpeg`,
    ],
  },
];

// ─── Location Card ───────────────────────────────────────────
function LocationCard({ location }: { location: LocationData }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasMedia = location.photos.length > 0 || (location.videos && location.videos.length > 0);
  const previewPhotos = location.photos.slice(0, 4);

  return (
    <>
      <div className="postcard overflow-hidden">
        <button
          onClick={() => hasMedia && setExpanded(!expanded)}
          className={`relative w-full aspect-[4/3] overflow-hidden block ${
            hasMedia ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <Image
            src={location.illustration}
            alt={location.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {hasMedia && (
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-wider">
                {expanded ? 'Hide' : 'View more'}
              </span>
            </div>
          )}
        </button>

        <div className="p-4 pb-3">
          <p className="font-mono text-xs text-black/50 tracking-wide uppercase">
            {location.name}
          </p>
        </div>

        <AnimatePresence>
          {expanded && hasMedia && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {previewPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {previewPhotos.map((photo, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setLightboxIndex(i)}
                      >
                        <Image
                          src={photo}
                          alt={`${location.name} photo ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {location.videos && location.videos.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 mb-3">
                    {location.videos.map((videoSrc, i) => (
                      <video
                        key={i}
                        src={videoSrc}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {location.photos.length > previewPhotos.length && (
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="w-full py-2 text-center font-mono text-xs opacity-60 hover:opacity-90 hover:underline underline-offset-4 transition-all"
                  >
                    View gallery ({location.photos.length} photos)
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {lightboxIndex !== null && location.photos.length > 0 && (
        <Lightbox
          images={location.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          locationName={location.name}
        />
      )}
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────
export default function AboutPage() {
  const [reelsStartIndex, setReelsStartIndex] = useState<number | null>(null);

  return (
    <main className="min-h-[350vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* ─── PERSONAL VIDEOS ─────────────────────────────── */}
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-base font-semibold">
                Scroll my Reels
              </p>
              <span className="text-sm opacity-50">
                {ALL_PERSONAL_VIDEOS.length} videos
              </span>
              <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mb-16">
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              {THUMBNAIL_VIDEOS.map((video, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden cursor-pointer group aspect-[9/16]"
                  onClick={() => setReelsStartIndex(i)}
                >
                  <video
                    src={video.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius: 0 }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/60 uppercase tracking-wider">
                    {video.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── BIO ──────────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12 mb-16 max-w-3xl mx-auto">
              <p className="font-serif-italic text-xl md:text-2xl text-black/70 leading-relaxed">
                I&apos;m fascinated by people: what gets them out of bed every morning,
                the things that make each of them unique. That fascination turned
                into telling the stories of founders, and now helping startups
                utilize storytelling to drive growth.
              </p>
            </div>
          </motion.div>

          {/* ─── LOCATIONS ────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/35 mb-8">
              Places
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {LOCATIONS.map((location, i) => (
              <motion.div
                key={location.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <LocationCard location={location} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels viewer overlay */}
      {reelsStartIndex !== null && (
        <ReelsViewer
          videos={ALL_PERSONAL_VIDEOS}
          startIndex={reelsStartIndex}
          onClose={() => setReelsStartIndex(null)}
        />
      )}
    </main>
  );
}
