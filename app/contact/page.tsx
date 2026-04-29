'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

export default function ContactPage() {
  return (
    <main className="min-h-[250vh] pt-24 pb-32">
      <section className="px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <div className="postcard p-8 md:p-12">
              <p className="font-serif-italic text-xl md:text-2xl text-black/70 leading-relaxed mb-6">
                The work you&apos;ve put in deserves content that can encapsulate it.
              </p>

              <p className="text-black/60 leading-relaxed mb-10">
                Whether you need an ongoing content partner, a story told right,
                or just want to talk about what you&apos;re building: I&apos;d love to hear
                from you.
              </p>

              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/35 mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:contact@seyvikmagon.com"
                    className="text-lg text-accent-teal hover:underline underline-offset-4 transition-colors"
                  >
                    contact@seyvikmagon.com
                  </a>
                </div>

                <div className="h-px bg-black/8" />

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/35 mb-3">
                    Socials
                  </p>
                  <div className="space-y-2">
                    <a
                      href="https://instagram.com/seyvikmagon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="text-black/60 group-hover:text-black transition-colors">
                        Instagram
                      </span>
                      <span className="font-mono text-sm text-black/35">
                        @seyvikmagon
                      </span>
                    </a>
                    <a
                      href="https://linkedin.com/in/seyvikmagon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="text-black/60 group-hover:text-black transition-colors">
                        LinkedIn
                      </span>
                      <span className="font-mono text-sm text-black/35">
                        /in/seyvikmagon
                      </span>
                    </a>
                    <a
                      href="https://tiktok.com/@seyvikmagon07"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <span className="text-black/60 group-hover:text-black transition-colors">
                        TikTok
                      </span>
                      <span className="font-mono text-sm text-black/35">
                        @seyvikmagon07
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
