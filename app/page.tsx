'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
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
  if (!project) return null;

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.1 }}>
      <Link href={`/projects/${slug}`} className="block">
        <div className="postcard p-6 md:p-8 cursor-pointer">
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h3 className="text-lg md:text-xl font-bold">
                {project.title}
              </h3>
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
            {project.videos.length > 0
              ? `${project.title}: ${project.videos.map(v => v.label).join(', ')}`
              : ''}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-[500vh]">
      {/* ─── HERO SECTION ─────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-14">
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
