'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const HOME_PROJECTS = ['truemed', 'mgmt-boston', 'founder-storytelling', 'cash-flows'];

function ProjectCard({ slug, index }: { slug: string; index: number }) {
  const project = PROJECTS[slug];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hovered) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [hovered]);

  if (!project) return null;

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.1 }}>
      <Link href={`/projects/${slug}`} className="block group">
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ aspectRatio: '4/5' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-white/60 tracking-wide mt-1">
              {project.tag}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FlyingPigeon() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('pigeon-flew')) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('pigeon-flew', '1');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ x: '-60px', opacity: 0 }}
      animate={{ x: 'calc(100vw + 60px)', opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration: 12, ease: 'linear' }}
      onAnimationComplete={() => setShow(false)}
      className="fixed z-20 pointer-events-none"
      style={{ top: '35vh' }}
    >
      <Image
        src="https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/site-media/Entergalactic/pigeon-widget.png"
        alt=""
        width={40}
        height={27}
        className="opacity-60"
      />
    </motion.div>
  );
}

function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollFraction = window.scrollY / (window.innerHeight * 0.1);
      setOpacity(Math.max(0, 1 - scrollFraction));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{ opacity }}
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      /* Position at roughly 85vh */
      /* Using bottom positioning relative to the hero section */
    >
      <motion.svg
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-6 opacity-40"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </motion.svg>
      <span className="font-mono text-xs opacity-30 lowercase">
        scroll to watch the sunset
      </span>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-[500vh]">
      <FlyingPigeon />
      {/* ─── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#1A1A1A] mb-6">
            Seyvik Magon
          </h1>
          <p className="font-serif-italic text-xl md:text-2xl lg:text-3xl text-black/65 leading-relaxed max-w-2xl mx-auto mb-8">
            I create videos that build trust, make complex things click,
            and match the ambition of your startup.
          </p>
          <p className="font-mono text-sm text-black/45 tracking-wider">
            New York City. Babson &apos;26. Pursuit of Happiness.
          </p>
        </motion.div>

        {/* Scroll indicator positioned at ~85vh */}
        <div className="absolute bottom-[15vh] left-0 right-0 flex justify-center">
          <ScrollIndicator />
        </div>
      </section>

      {/* ─── WORK PREVIEW SECTION ─────────────────────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-40">
        <div className="max-w-5xl mx-auto">
          <motion.p
            {...fadeUp}
            className="font-mono text-xs uppercase tracking-[0.2em] opacity-35 mb-12 md:mb-16"
          >
            Selected Work
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {HOME_PROJECTS.map((slug, i) => (
              <ProjectCard key={slug} slug={slug} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-40">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <div className="postcard p-8 md:p-12">
            <p className="font-serif-italic text-xl md:text-2xl leading-relaxed mb-6 opacity-75">
              I&apos;m fascinated by people: what gets them out of bed every morning,
              the things that make each of them unique. That fascination turned
              into telling the stories of founders, then a way of thinking about
              how stories drive growth.
            </p>
            <p className="leading-relaxed opacity-60">
              I studied finance and interned as a Private Credit Analyst on
              Wall Street. And then I picked up a camera.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 font-mono text-sm text-accent-teal hover:underline underline-offset-4 transition-colors"
            >
              More about me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-40">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto">
          <div className="postcard p-8 md:p-12">
            <p className="font-serif-italic text-xl md:text-2xl leading-relaxed mb-6">
              The work you&apos;ve put in deserves content that can encapsulate it.
            </p>
            <p className="leading-relaxed mb-8 opacity-70">
              Whether you need an ongoing content partner, a story told right,
              or just want to talk about what you&apos;re building: I&apos;d love to hear
              from you.
            </p>
            <div className="space-y-3 font-mono text-sm">
              <a
                href="mailto:contact@seyvikmagon.com"
                className="block text-accent-teal hover:underline underline-offset-4"
              >
                contact@seyvikmagon.com
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 opacity-50">
                <a
                  href="https://instagram.com/seyvikmagon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/in/seyvikmagon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  LinkedIn
                </a>
                <a
                  href="https://tiktok.com/@seyvikmagon07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="h-[30vh]" />
    </main>
  );
}
