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
  detail?: string;
}

const EDUCATION: ResumeEntry[] = [
  {
    title: 'BS Finance',
    org: 'Babson College',
    date: 'May 2026',
    detail: '3.83 GPA. Dean\u2019s List 2022\u20132025.',
  },
  {
    title: 'BBA Exchange',
    org: 'IE University Madrid',
    date: 'Spring 2025',
    detail: 'VC thesis to K Fund.',
  },
];

const EXPERIENCE: ResumeEntry[] = [
  {
    title: 'Private Credit Summer Analyst',
    org: 'Fortress Investment Group',
    date: 'June\u2013Aug 2025',
  },
  {
    title: 'Private Equity Analyst',
    org: 'Mantra Investment Partners',
    date: 'June\u2013Aug 2024',
  },
  {
    title: 'Commercial Real Estate Analyst',
    org: 'Lotus Equity Partners',
    date: 'June\u2013Aug 2023',
  },
  {
    title: 'Tax Intern',
    org: 'Cornerstone Legacy Financial Advisors',
    date: 'Jan\u2013May 2024',
  },
];

const LEADERSHIP: ResumeEntry[] = [
  {
    title: 'Founder',
    org: 'Pursuit of Happiness Productions',
    date: 'June 2025\u2013Present',
  },
  {
    title: 'Captain',
    org: 'Babson Club Soccer',
    date: 'Aug 2023\u2013Present',
  },
  {
    title: 'Manager',
    org: 'Catskills Airbnb',
    date: 'June 2023\u2013Present',
  },
  {
    title: 'Co-Founder & CTO',
    org: 'A-Wear',
    date: 'Jan\u2013May 2023',
  },
];

const SKILLS = [
  'Financial Modeling',
  'Excel',
  'SQL',
  'Data Analysis',
  'PowerPoint',
  'Market Research',
];

function Section({
  title,
  entries,
}: {
  title: string;
  entries: ResumeEntry[];
}) {
  return (
    <div className="mb-10 last:mb-0">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-black/35 mb-6">
        {title}
      </h2>
      <div className="space-y-5">
        {entries.map((entry, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1A1A1A]">{entry.title}</p>
              <p className="text-black/60 text-sm">{entry.org}</p>
              {entry.detail && (
                <p className="text-black/45 text-sm mt-0.5">{entry.detail}</p>
              )}
            </div>
            <p className="font-mono text-xs text-black/40 shrink-0">
              {entry.date}
            </p>
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
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-10">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                    Seyvik Magon
                  </h1>
                  <p className="font-mono text-xs text-black/40 tracking-wide mt-2">
                    New York City
                  </p>
                </div>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A1A] text-white text-sm font-mono hover:bg-black transition-colors shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
                  </svg>
                  PDF
                </a>
              </div>

              {/* Divider */}
              <div className="h-px bg-black/8 mb-10" />

              <Section title="Education" entries={EDUCATION} />

              <div className="h-px bg-black/8 my-10" />

              <Section title="Experience" entries={EXPERIENCE} />

              <div className="h-px bg-black/8 my-10" />

              <Section title="Leadership" entries={LEADERSHIP} />

              <div className="h-px bg-black/8 my-10" />

              {/* Skills */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-black/35 mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-full border border-black/10 text-black/55"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
