'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

interface LocationData {
  name: string;
  illustration: string;
  photos: string[];
}

const LOCATIONS: LocationData[] = [
  {
    name: 'Battery Park City, NYC',
    illustration: '/site-media/Entergalactic/batterypark-city.png',
    photos: [
      '/site-media/nyc/south-cove-in-battery.jpg',
      '/site-media/nyc/hudson-river-park-with-manhattan-financial-district-skyscrapers-sunset-F64JPW.jpg',
      '/site-media/nyc/IMG_6024.png',
    ],
  },
  {
    name: 'Chelsea, NYC',
    illustration: '/site-media/Entergalactic/chelsea.png',
    photos: [
      '/site-media/Entergalactic/wallstreet-selfie.png',
      '/site-media/Entergalactic/battery_park-betterphoto.png',
    ],
  },
  {
    name: 'Babson College',
    illustration: '/site-media/Entergalactic/babson-field.png',
    photos: [],
  },
  {
    name: 'Madrid, Casa de Campo',
    illustration: '/site-media/Entergalactic/madrid-casa-de-camppo.png',
    photos: [
      '/site-media/madrid/DSC07993.JPG',
      '/site-media/madrid/IMG_0093.JPG',
      '/site-media/madrid/P1010128.JPG',
      '/site-media/madrid/IMG_3584.jpeg',
    ],
  },
  {
    name: 'SF Chinatown',
    illustration: '/site-media/Entergalactic/chinatown.jpeg',
    photos: [],
  },
];

function LocationCard({ location }: { location: LocationData }) {
  const [expanded, setExpanded] = useState(false);
  const hasPhotos = location.photos.length > 0;

  return (
    <div className="postcard overflow-hidden">
      {/* Illustration */}
      <button
        onClick={() => hasPhotos && setExpanded(!expanded)}
        className={`relative w-full aspect-[4/3] overflow-hidden block ${
          hasPhotos ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <Image
          src={location.illustration}
          alt={location.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {hasPhotos && (
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="font-mono text-[10px] text-white/80 uppercase tracking-wider">
              {expanded ? 'Hide photos' : 'View photos'}
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

      {/* Expanded photos */}
      <AnimatePresence>
        {expanded && hasPhotos && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-2 gap-2">
              {location.photos.map((photo, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-[350vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* ─── BIO ──────────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12 mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
