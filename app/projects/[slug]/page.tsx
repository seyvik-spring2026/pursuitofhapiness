'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  const videosWithSrc = project?.videos.filter((v) => v.src) ?? [];

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
            vid.currentTime = 0;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(vid);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [videosWithSrc.length]);

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
        // Mute the previously unmuted video
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
            className="text-accent-teal font-mono text-sm hover:underline underline-offset-4"
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
          {/* Desktop: side-by-side. Mobile: stacked */}
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
                    className="snap-start w-full flex items-center justify-center"
                    style={{ height: '85vh' }}
                  >
                    <div
                      className="relative w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={() => handleVideoClick(i)}
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el;
                        }}
                        src={video.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="max-h-full w-auto object-contain"
                        style={{
                          aspectRatio: '9/16',
                          maxWidth: '100%',
                          borderRadius: 0,
                        }}
                      />
                      {/* Unmute hint overlay */}
                      {unmutedIndex !== i && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              className="w-5 h-5 text-black/70"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll indicator */}
              {videosWithSrc.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
                  <span className="font-mono text-xs opacity-50">
                    {currentIndex + 1} / {videosWithSrc.length}
                  </span>
                  {!hasScrolled && (
                    <motion.span
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: [0.6, 1, 0.6], y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="font-mono text-[10px] opacity-40"
                    >
                      scroll for more ↓
                    </motion.span>
                  )}
                </div>
              )}
            </div>

            {/* ─── DESCRIPTION PANEL ─────────────────────────── */}
            <div className="lg:w-[40%] lg:pt-4">
              <Link
                href="/projects"
                className="inline-block font-mono text-sm opacity-40 hover:opacity-60 transition-opacity mb-8"
              >
                ← All Projects
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
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

              {/* Video labels list */}
              {videosWithSrc.length > 1 && (
                <div className="mt-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-30 mb-3">
                    Videos
                  </p>
                  <ul className="space-y-2">
                    {videosWithSrc.map((video, i) => (
                      <li key={i}>
                        <button
                          onClick={() => {
                            const container = scrollContainerRef.current;
                            if (container) {
                              container.scrollTo({
                                top: i * container.clientHeight,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          className={`font-mono text-sm transition-opacity ${
                            currentIndex === i
                              ? 'opacity-80 text-accent-teal'
                              : 'opacity-40 hover:opacity-60'
                          }`}
                        >
                          {video.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
