'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';
import VideoCard from '@/components/VideoCard';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-14">
        <div className="postcard p-8 md:p-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/projects" className="text-accent-teal font-mono text-sm hover:underline underline-offset-4">
            Back to all projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[300vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div {...fadeUp}>
            <Link
              href="/projects"
              className="inline-block font-mono text-sm opacity-40 hover:opacity-60 transition-opacity mb-10"
            >
              &larr; All Projects
            </Link>
          </motion.div>

          {/* ─── CONTEXT ──────────────────────────────────────── */}
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12 mb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {project.title}
                  </h1>
                  <p className="font-mono text-xs opacity-40 tracking-wide mt-2">
                    {project.tag}
                  </p>
                </div>
                <span className="postmark">{project.postmark}</span>
              </div>

              {project.context.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="opacity-65 leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* ─── WORK (VIDEOS) ────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.videos.map((video, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="postcard p-4 md:p-5">
                  <VideoCard
                    src={video.src}
                    label={video.label}
                    aspect="9/16"
                    mode="full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
