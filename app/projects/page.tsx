'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

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

  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.08 }}
    >
      <Link href={`/projects/${slug}`} className="block group">
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
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}

          {/* Dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-black/70 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Title and blurb overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-white/60 leading-snug mt-2 line-clamp-2">
              {project.context.split('\n\n')[0]}...
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
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
