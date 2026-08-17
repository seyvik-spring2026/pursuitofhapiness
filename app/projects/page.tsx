'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';
import { playVideoFullscreen } from '@/lib/videoFullscreen.mjs';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const PROJECT_ORDER = [
  'truemed',
  'mgmt-boston',
  'founder-storytelling',
  'arcangel',
  'cash-flows',
];

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

  const handleMobilePlay = () => {
    if (videoRef.current) {
      void playVideoFullscreen(videoRef.current);
    }
  };

  return (
    <motion.article
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.08 }}
      className="group"
    >
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ aspectRatio: '4/5' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Video background */}
          {project.previewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              poster={project.previewPoster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
            />
          )}

          <button
            type="button"
            onClick={handleMobilePlay}
            aria-label={`Play ${project.title} fullscreen`}
            className="absolute inset-0 z-10 md:hidden"
          />

          <Link
            href={`/projects/${slug}`}
            aria-label={`View ${project.title} project`}
            className="absolute inset-0 z-10 hidden md:block"
          />

          {/* Dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play button on hover */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Title and blurb overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
            <Link
              href={`/projects/${slug}`}
              aria-label={`View ${project.title} project`}
              className="pointer-events-auto relative z-30 md:hidden"
            >
              <h2 className="text-3xl font-bold text-white leading-tight">
                {project.title}
              </h2>
            </Link>
            <h2 className="hidden text-4xl font-bold leading-tight text-white md:block lg:text-5xl">
              {project.title}
            </h2>
            <p className="text-sm text-white/60 leading-snug mt-2 line-clamp-2">
              {project.context.split('\n\n')[0]}...
            </p>
          </div>
        </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-[400vh] pt-20 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PROJECT_ORDER.map((slug, i) => (
              <ProjectCard key={slug} slug={slug} index={i} />
            ))}
          </div>

          {/* Source code link */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: PROJECT_ORDER.length * 0.08 }}
            className="mt-16 text-center"
          >
            <a
              href="https://github.com/seyvik-spring2026/pursuitofhapiness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View Source on GitHub
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
