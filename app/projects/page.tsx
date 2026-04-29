'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
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
  'cash-flows',
  'arcangel',
  'personal',
  'catskills-airbnb',
];

export default function ProjectsPage() {
  return (
    <main className="min-h-[400vh] pt-20 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {PROJECT_ORDER.map((slug, i) => {
              const project = PROJECTS[slug];
              if (!project) return null;
              return (
                <motion.div
                  key={slug}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                >
                  <Link href={`/projects/${slug}`} className="block">
                    <div className="postcard p-6 md:p-8 cursor-pointer h-full">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <h2 className="text-lg md:text-xl font-bold">
                            {project.title}
                          </h2>
                          <p className="font-mono text-xs opacity-40 tracking-wide mt-1">
                            {project.tag}
                          </p>
                        </div>
                        <span className="postmark">{project.postmark}</span>
                      </div>

                      <div className="my-5">
                        <VideoCard src={project.previewVideo} aspect="4/5" />
                      </div>

                      <p className="text-sm opacity-60 leading-relaxed">
                        {project.context.split('\n\n')[0]}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
