'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

interface ResumeEntry {
  title: string;
  org: string;
  date: string;
}

const EDUCATION: ResumeEntry[] = [
  { title: 'BS Finance', org: 'Babson College', date: 'May 2026' },
  { title: 'BBA Exchange', org: 'IE University Madrid', date: 'Spring 2025' },
];

const FINANCE: ResumeEntry[] = [
  { title: 'Private Credit Summer Analyst', org: 'Fortress Investment Group', date: 'June-Aug 2025' },
  { title: 'Private Equity Analyst', org: 'Mantra Investment Partners', date: 'June-Aug 2024' },
  { title: 'Commercial Real Estate Analyst', org: 'Lotus Equity Partners', date: 'June-Aug 2023' },
];

const MEDIA: ResumeEntry[] = [
  { title: 'Founder', org: 'Poh Media', date: 'June 2025-Present' },
  { title: 'Media Associate', org: 'MGMT Boston', date: 'Feb 2026-Present' },
  { title: 'Content Producer', org: 'Truemed', date: 'Jan-Apr 2026' },
];

const LEADERSHIP: ResumeEntry[] = [
  { title: 'Captain', org: 'Babson Club Soccer', date: 'Aug 2023-Present' },
  { title: 'Manager', org: 'Catskills Airbnb', date: 'June 2023-Present' },
];

function Section({ title, entries }: { title: string; entries: ResumeEntry[] }) {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold">{entry.title}</p>
              <p className="opacity-50 text-sm">{entry.org}</p>
            </div>
            <p className="font-mono text-xs opacity-40 shrink-0">{entry.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <main className="min-h-[300vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Seyvik Magon</h1>
            <p className="font-mono text-xs opacity-40 tracking-wide mb-12">
              New York City
            </p>
          </motion.div>

          <div className="space-y-0">
            <motion.div {...fadeUp}>
              <Section title="Education" entries={EDUCATION} />
            </motion.div>

            <motion.div {...fadeUp}>
              <div className="h-px opacity-10 bg-current my-10" />
              <Section title="Finance" entries={FINANCE} />
            </motion.div>

            <motion.div {...fadeUp}>
              <div className="h-px opacity-10 bg-current my-10" />
              <Section title="Media & Content" entries={MEDIA} />
            </motion.div>

            <motion.div {...fadeUp}>
              <div className="h-px opacity-10 bg-current my-10" />
              <Section title="Leadership" entries={LEADERSHIP} />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
