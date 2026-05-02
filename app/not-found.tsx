'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-14">
      <div className="postcard p-8 md:p-12 text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 10, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6"
        >
          <Image
            src="https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/site-media/Entergalactic/pigeon-widget.png"
            alt="A very judgmental pigeon"
            width={200}
            height={200}
            className="mx-auto rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-bold mb-3">404</h1>
          <p className="font-serif-italic text-lg opacity-65 mb-6">
            This pigeon has no idea where that page went.
          </p>
          <Link
            href="/"
            className="inline-block font-mono text-sm text-accent-teal hover:underline underline-offset-4"
          >
            Back to safety
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
