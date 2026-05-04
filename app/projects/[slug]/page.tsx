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
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(0);
  const initializedRef = useRef(false);

  const videosWithSrc = project?.videos.filter((v) => v.src) ?? [];

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
            // Autoplay unmuted, fall back to muted if browser blocks
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

              {/* Scroll indicator in description panel */}
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
