'use client';

import { useState, useRef, useEffect } from 'react';
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

// ─── Personal Videos ─────────────────────────────────────────
const PERSONAL_VIDEOS = [
  { label: 'Intramural Soccer', src: `${R2}/Videos/personal/intramural-soccer.mp4` },
  { label: 'Day in the Life', src: `${R2}/Videos/personal/day-in-the-life-og.mp4` },
  { label: 'Pursuit of Happiness', src: `${R2}/Videos/personal/pursuit-of-hapiness.mp4` },
  { label: 'Esto es Miami', src: `${R2}/Videos/personal/esto-es-miami.mp4` },
  { label: 'Chinatown', src: `${R2}/Videos/personal/chinatown.mp4` },
];

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
    photos: [],
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
    photos: [],
  },
];

// ─── Personal Video Card ─────────────────────────────────────
function PersonalVideoCard({ video }: { video: { label: string; src: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unmuted, setUnmuted] = useState(false);

  const handleMouseEnter = () => {
    const vid = videoRef.current;
    if (!vid || unmuted) return;
    vid.currentTime = 0;
    vid.play().catch(() => {});
    setPlaying(true);
  };

  const handleMouseLeave = () => {
    const vid = videoRef.current;
    if (!vid || unmuted) return;
    vid.pause();
    setPlaying(false);
  };

  const handleClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (unmuted) {
      vid.muted = true;
      vid.controls = false;
      setUnmuted(false);
    } else {
      vid.muted = false;
      vid.controls = true;
      vid.play().catch(() => {});
      setUnmuted(true);
      setPlaying(true);
    }
  };

  return (
    <div
      className="flex-shrink-0 w-[260px] md:w-[300px] cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '9/16', borderRadius: 0 }}>
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ borderRadius: 0 }}
        />
        {!playing && !unmuted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/50 uppercase tracking-wider">
          {video.label}
        </span>
      </div>
    </div>
  );
}

// ─── Location Card ───────────────────────────────────────────
function LocationCard({ location }: { location: LocationData }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasMedia = location.photos.length > 0 || (location.videos && location.videos.length > 0);
  const previewPhotos = location.photos.slice(0, 4);

  return (
    <>
      <div className="postcard overflow-hidden">
        {/* Illustration */}
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

        {/* Location name */}
        <div className="p-4 pb-3">
          <p className="font-mono text-xs text-black/50 tracking-wide uppercase">
            {location.name}
          </p>
        </div>

        {/* Expanded preview */}
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
                {/* Photo previews */}
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

                {/* Videos */}
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
                        style={{ borderRadius: '0.5rem' }}
                      />
                    ))}
                  </div>
                )}

                {/* View gallery button */}
                {location.photos.length > previewPhotos.length && (
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="w-full py-2 text-center font-mono text-xs text-accent-teal hover:underline underline-offset-4 transition-colors"
                  >
                    View gallery ({location.photos.length} photos)
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
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
  return (
    <main className="min-h-[350vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* ─── PERSONAL VIDEOS ─────────────────────────────── */}
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-35 mb-6">
              Me, unfiltered
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="mb-16">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
              {PERSONAL_VIDEOS.map((video, i) => (
                <PersonalVideoCard key={i} video={video} />
              ))}
            </div>
          </motion.div>

          {/* ─── BIO ──────────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12 mb-16 max-w-3xl mx-auto">
              <p className="font-serif-italic text-xl md:text-2xl text-black/70 leading-relaxed mb-6">
                I&apos;m fascinated by people: what gets them out of bed every morning,
                the things that make each of them unique. That fascination turned
                into telling the stories of founders, then a way of thinking about
                how stories drive growth.
              </p>

              <p className="text-black/60 leading-relaxed mb-4">
                I studied finance at Babson. I interned at Fortress Investment Group
                doing private credit, at Mantra Investment Partners doing private
                equity, at Lotus Equity Partners doing commercial real estate. I
                studied abroad in Madrid at IE University.
              </p>

              <p className="font-serif-italic text-lg text-black/65 leading-relaxed mb-4">
                And then I picked up a camera.
              </p>

              <p className="text-black/60 leading-relaxed mb-4">
                I also run an Airbnb in the Catskills that&apos;s generated $170K+ in
                revenue. I co-founded an e-commerce brand that turned $4K+ in
                profit in three months. I captain the Babson club soccer team and
                secured $19K+ in funding for the program.
              </p>

              <p className="font-mono text-sm text-black/45 mt-6">
                Currently based in New York City. Graduating May 2026.
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
    </main>
  );
}
