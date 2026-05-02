'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  locationName: string;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  locationName,
}: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef(0);

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setLoaded(false);
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setLoaded(false);
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Close button - always visible */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/30 hover:bg-black/80 transition-colors"
        aria-label="Close gallery"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] font-mono text-sm text-white/70">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center px-14 py-20 z-[105]">
        <div
          className="relative w-full h-full max-w-4xl max-h-[80vh] transition-opacity duration-200"
          style={{ opacity: loaded ? 1 : 0.3 }}
        >
          <Image
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`${locationName} photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {/* Nav arrows */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-black/80 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={goNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 hover:bg-black/80 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
