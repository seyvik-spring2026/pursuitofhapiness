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
  'rho-events',
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

        </div>
      </section>
    </main>
  );
}
