'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

// ─── Founder metadata for dynamic descriptions ──────────────
interface FounderData {
  videoSrc: string;
  founderName: string;
  founderUrl: string;
  founderUrlType: 'linkedin' | 'instagram';
  company: string;
  companyUrl: string;
  companyUrlType: 'website' | 'instagram';
  description: string;
}

const FOUNDERS: FounderData[] = [
  {
    videoSrc: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-desieats.mp4',
    founderName: 'Krish Khemlani',
    founderUrl: 'https://www.linkedin.com/in/krish-khemlani-204105217/',
    founderUrlType: 'linkedin',
    company: 'Desi Eats',
    companyUrl: 'https://www.instagram.com/desieatsus/',
    companyUrlType: 'instagram',
    description: 'Bringing Indian street food culture to a wider audience.',
  },
  {
    videoSrc: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-mateo-clave.mp4',
    founderName: 'Mateo Acosta-Rubio',
    founderUrl: 'https://www.linkedin.com/in/mateo-ar/',
    founderUrlType: 'linkedin',
    company: 'Clave AI',
    companyUrl: 'https://tryclave.ai/',
    companyUrlType: 'website',
    description: 'AI-powered platform turning raw data into actionable insights for restaurants.',
  },
  {
    videoSrc: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-faizan-speakeasy.mp4',
    founderName: 'Faizan Asif',
    founderUrl: 'https://www.instagram.com/npcfaizan/',
    founderUrlType: 'instagram',
    company: 'Speakeasy',
    companyUrl: 'https://www.speakeasy.run/',
    companyUrlType: 'website',
    description: 'Solving the speaking pandemic. Grew @fortytwoco to $1M ARR.',
  },
  {
    videoSrc: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-damfellows.mp4',
    founderName: 'Krish Bhatia',
    founderUrl: 'https://www.linkedin.com/in/krishyb123/',
    founderUrlType: 'linkedin',
    company: 'Bobby Browser',
    companyUrl: 'https://www.bobbybrowser.com/',
    companyUrlType: 'website',
    description: 'Building the next generation of browser tools.',
  },
];

function LinkIcon({ type }: { type: 'linkedin' | 'instagram' | 'website' }) {
  if (type === 'linkedin') {
    return (
      <svg className="w-4 h-4 inline-block ml-1.5 opacity-40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg className="w-4 h-4 inline-block ml-1.5 opacity-40" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 inline-block ml-1.5 opacity-40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(0);
  const initializedRef = useRef(false);

  const videosWithSrc = project?.videos.filter((v) => v.src) ?? [];
  const isFounderPage = slug === 'founder-storytelling';

  // Build a map from video src to founder data
  const founderByIndex = isFounderPage
    ? videosWithSrc.map((v) => FOUNDERS.find((f) => f.videoSrc === v.src) ?? null)
    : [];

  const currentFounder = isFounderPage ? founderByIndex[currentIndex] : null;

  // Autoplay first video unmuted on mount
  useEffect(() => {
    if (initializedRef.current || !videosWithSrc.length) return;
    initializedRef.current = true;
    const vid = videoRefs.current[0];
    if (!vid) return;
    vid.muted = false;
    vid.controls = true;
    vid.play().catch(() => {
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }, [videosWithSrc.length]);

  // Track which video is in view via IntersectionObserver
  useEffect(() => {
    if (!videosWithSrc.length) return;
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentIndex(i);
            if (i !== 0 || hasScrolled) {
              vid.currentTime = 0;
            }
            vid.muted = false;
            vid.controls = true;
            setUnmutedIndex(i);
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
  }, [videosWithSrc.length, hasScrolled]);

  // Track first scroll to hide the hint
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      if (!hasScrolled) setHasScrolled(true);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [hasScrolled]);

  const handleVideoClick = useCallback(
    (index: number) => {
      const vid = videoRefs.current[index];
      if (!vid) return;
      if (unmutedIndex === index) {
        vid.muted = true;
        vid.controls = false;
        setUnmutedIndex(null);
      } else {
        if (unmutedIndex !== null && videoRefs.current[unmutedIndex]) {
          videoRefs.current[unmutedIndex]!.muted = true;
          videoRefs.current[unmutedIndex]!.controls = false;
        }
        vid.muted = false;
        vid.controls = true;
        setUnmutedIndex(index);
      }
    },
    [unmutedIndex]
  );

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-14">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link
            href="/projects"
            className="font-mono text-sm opacity-60 hover:opacity-90 hover:underline underline-offset-4 transition-all"
          >
            Back to all projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <section className="px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ─── VIDEO COLUMN ──────────────────────────────── */}
            <div className="lg:w-[60%] relative">
              <div
                ref={scrollContainerRef}
                className="snap-y snap-mandatory overflow-y-auto"
                style={{ height: '85vh' }}
              >
                {videosWithSrc.map((video, i) => (
                  <div
                    key={i}
                    className="snap-start w-full flex items-center justify-center relative"
                    style={{ height: '85vh' }}
                  >
                    <div
                      className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                      onClick={() => handleVideoClick(i)}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el;
                        }}
                        src={video.src}
                        muted={i !== 0}
                        loop
                        playsInline
                        preload="metadata"
                        controls={i === 0}
                        className="max-h-full w-auto object-contain"
                        style={{
                          aspectRatio: '9/16',
                          maxWidth: '100%',
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── DESCRIPTION PANEL ─────────────────────────── */}
            <div className="lg:w-[40%] lg:pt-2">
              <Link
                href="/projects"
                className="inline-block font-mono text-sm opacity-40 hover:opacity-60 transition-opacity mb-6"
              >
                ← All Projects
              </Link>

              {/* Dynamic founder content or static project content */}
              {isFounderPage && currentFounder ? (
                <div key={currentFounder.founderName}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
                    <a
                      href={currentFounder.founderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity underline decoration-1 underline-offset-4 decoration-current/20 hover:decoration-current/50"
                    >
                      {currentFounder.founderName}
                      <LinkIcon type={currentFounder.founderUrlType} />
                    </a>
                  </h1>
                  <p className="text-2xl md:text-3xl font-bold mb-6 opacity-70">
                    <a
                      href={currentFounder.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-100 transition-opacity underline decoration-1 underline-offset-4 decoration-current/20 hover:decoration-current/50"
                    >
                      {currentFounder.company}
                      <LinkIcon type={currentFounder.companyUrlType} />
                    </a>
                  </p>
                  <p className="opacity-65 leading-relaxed mb-6">
                    {currentFounder.description}
                  </p>
                  <div className="h-px opacity-10 bg-current my-8" />
                  <p className="font-mono text-xs opacity-40 tracking-wide mb-4">
                    {project.tag}
                  </p>
                  <div className="space-y-4">
                    {project.context.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="opacity-50 leading-relaxed text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
                    {project.title}
                  </h1>
                  <p className="font-mono text-xs opacity-40 tracking-wide mb-8">
                    {project.tag}
                  </p>
                  <div className="space-y-4">
                    {project.context.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="opacity-65 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              )}

              {/* Scroll indicator */}
              {videosWithSrc.length > 1 && (
                <div className="mt-12 flex flex-col items-start gap-2">
                  <p className="text-base opacity-60">
                    {currentIndex + 1} / {videosWithSrc.length}
                  </p>
                  {!hasScrolled && (
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-2"
                    >
                      <motion.svg
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-5 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                      <span className="text-sm opacity-50">
                        Scroll for more videos
                      </span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
