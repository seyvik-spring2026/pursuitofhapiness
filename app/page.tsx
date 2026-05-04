'use client';

import Link from 'next/link';
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-white/60 leading-snug mt-2 line-clamp-2">
              {project.context.split('\n\n')[0]}...
            </p>
          </div>
        </div>
      </Link>
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
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-8 h-8 opacity-60"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </motion.svg>
      <span className="font-mono text-sm opacity-50 lowercase">
        scroll to watch the sunset
      </span>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-[500vh]">
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
            <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-75">
              I&apos;m a finance student at Babson College, and for the past two
              summers I&apos;ve interned in finance, most recently as a private
              credit analyst on Wall Street. When I was very young, I used to
              make movies about everything. I&apos;ve started doing it again.
            </p>
            <Link
              href="/about"
              className="inline-block mt-2 font-mono text-sm opacity-60 hover:opacity-90 hover:underline underline-offset-4 transition-all"
            >
              More about me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-40">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <p className="font-serif-italic text-3xl md:text-4xl lg:text-5xl leading-snug mb-10">
            The work you&apos;ve put in deserves content that can encapsulate it.
          </p>

          <p className="opacity-60 leading-relaxed mb-12 text-lg">
            Whether you need an ongoing content partner, a story told right,
            or just want to talk about what you&apos;re building. I&apos;d love to hear
            from you.
          </p>

          <a
            href="mailto:contact@seyvikmagon.com"
            className="text-xl md:text-2xl opacity-80 hover:opacity-100 hover:underline underline-offset-4 transition-all"
          >
            contact@seyvikmagon.com
          </a>

          <div className="flex items-center justify-center gap-6 mt-10">
            <a href="https://instagram.com/seyvikmagon" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-80 transition-opacity" aria-label="Instagram">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com/in/seyvikmagon" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-80 transition-opacity" aria-label="LinkedIn">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://tiktok.com/@seyvikmagon07" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-80 transition-opacity" aria-label="TikTok">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
          </div>

          <a
            href="mailto:contact@seyvikmagon.com"
            className="inline-block mt-12 px-8 py-3 bg-black text-white font-mono text-sm tracking-wide hover:bg-black/80 transition-colors"
          >
            Let&apos;s work together
          </a>
        </motion.div>
      </section>

      <div className="h-[30vh]" />
    </main>
  );
}
