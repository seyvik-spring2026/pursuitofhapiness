'use client';

import { useEffect, useRef, useState } from 'react';

// Keyframes extracted from /public/site-media/sunset stages/
// Each keyframe: [scrollPosition, topColor, upperMidColor, lowerMidColor, horizonColor, glowColor, glowIntensity]
const SUNSET_KEYFRAMES = [
  // Stage 1: Start Sky — bright blue sky, light blue bottom
  { pos: 0.0,  top: [44, 82, 160],  upperMid: [74, 114, 187], lowerMid: [107, 157, 204], horizon: [155, 196, 220], glow: [170, 210, 230], glowPct: 0 },
  // Stage 2: First warmth — deeper blue top, seafoam/haze at horizon
  { pos: 0.12, top: [44, 72, 148],  upperMid: [64, 100, 170], lowerMid: [110, 148, 180], horizon: [184, 200, 204], glow: [200, 210, 200], glowPct: 10 },
  // Stage 3: Golden hour begins — warm peach horizon
  { pos: 0.24, top: [40, 68, 136],  upperMid: [56, 90, 150],  lowerMid: [140, 165, 184], horizon: [232, 200, 152], glow: [240, 200, 140], glowPct: 25 },
  // Stage 4: Deep golden hour — orange glow at horizon
  { pos: 0.36, top: [36, 60, 110],  upperMid: [48, 85, 130],  lowerMid: [120, 152, 168], horizon: [245, 168, 48],  glow: [232, 120, 32],  glowPct: 35 },
  // Stage 5: Peak sunset — vivid orange, rich navy top
  { pos: 0.48, top: [32, 55, 100],  upperMid: [42, 75, 115],  lowerMid: [86, 120, 128],  horizon: [255, 165, 24],  glow: [255, 100, 0],   glowPct: 40 },
  // Stage 6: Late sunset — deeper, muted warm tones
  { pos: 0.58, top: [26, 48, 82],   upperMid: [36, 65, 92],   lowerMid: [72, 100, 108],  horizon: [228, 140, 40],  glow: [200, 90, 30],   glowPct: 35 },
  // Stage 7: Dusk — dark navy, fading warm glow
  { pos: 0.68, top: [18, 34, 58],   upperMid: [28, 52, 72],   lowerMid: [46, 72, 82],    horizon: [192, 120, 56],  glow: [160, 80, 40],   glowPct: 28 },
  // Stage 8: Late dusk — deep dark, muted purple/gray horizon
  { pos: 0.78, top: [12, 24, 42],   upperMid: [20, 38, 55],   lowerMid: [36, 52, 64],    horizon: [112, 88, 104],  glow: [100, 70, 80],   glowPct: 15 },
  // Stage 9: Near night — almost fully dark
  { pos: 0.88, top: [8, 15, 26],    upperMid: [14, 26, 42],   lowerMid: [24, 38, 56],    horizon: [54, 68, 98],    glow: [50, 60, 80],    glowPct: 8 },
  // Stage 10: Night — fully dark
  { pos: 1.0,  top: [4, 8, 14],     upperMid: [8, 14, 24],    lowerMid: [14, 22, 36],    horizon: [24, 36, 56],    glow: [20, 30, 50],    glowPct: 0 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(c1: number[], c2: number[], t: number): number[] {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

function rgb(c: number[]): string {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function rgba(c: number[], a: number): string {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
}

function getInterpolatedKeyframe(scrollProgress: number) {
  const p = Math.max(0, Math.min(1, scrollProgress));

  // Find surrounding keyframes
  let i = 0;
  for (; i < SUNSET_KEYFRAMES.length - 1; i++) {
    if (p <= SUNSET_KEYFRAMES[i + 1].pos) break;
  }

  const kf1 = SUNSET_KEYFRAMES[i];
  const kf2 = SUNSET_KEYFRAMES[Math.min(i + 1, SUNSET_KEYFRAMES.length - 1)];

  // Local interpolation factor between these two keyframes
  const range = kf2.pos - kf1.pos;
  const t = range === 0 ? 0 : (p - kf1.pos) / range;

  return {
    top: lerpColor(kf1.top, kf2.top, t),
    upperMid: lerpColor(kf1.upperMid, kf2.upperMid, t),
    lowerMid: lerpColor(kf1.lowerMid, kf2.lowerMid, t),
    horizon: lerpColor(kf1.horizon, kf2.horizon, t),
    glow: lerpColor(kf1.glow, kf2.glow, t),
    glowPct: lerp(kf1.glowPct, kf2.glowPct, t),
  };
}

// Generate deterministic star positions once
function generateStars(count: number) {
  const stars: { x: number; y: number; size: number; delay: number }[] = [];
  // Use a simple seeded approach for consistency
  for (let i = 0; i < count; i++) {
    const seed = i * 7919; // prime for spread
    stars.push({
      x: ((seed * 13) % 10000) / 100,
      y: ((seed * 17) % 10000) / 100,
      size: 1 + ((seed * 23) % 3),
      delay: ((seed * 31) % 5000) / 1000,
    });
  }
  return stars;
}

const STARS = generateStars(80);

export default function SunsetSky() {
  const skyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [starOpacity, setStarOpacity] = useState(0);

  useEffect(() => {
    function updateSky() {
      const el = skyRef.current;
      if (!el) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

      const kf = getInterpolatedKeyframe(scrollProgress);

      el.style.background = [
        `radial-gradient(ellipse 80% 30% at 50% 100%, ${rgba(kf.glow, 0.6)} 0%, transparent ${kf.glowPct}%)`,
        `linear-gradient(to bottom, ${rgb(kf.top)} 0%, ${rgb(kf.upperMid)} 35%, ${rgb(kf.lowerMid)} 65%, ${rgb(kf.horizon)} 100%)`,
      ].join(', ');

      // Broadcast sky phase to body for adaptive postcards
      if (scrollProgress < 0.35) {
        document.body.dataset.sky = 'light';
      } else if (scrollProgress < 0.6) {
        document.body.dataset.sky = 'dusk';
      } else {
        document.body.dataset.sky = 'dark';
      }

      // Stars fade in during dusk/night (progress > 0.55)
      const starFade = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.2));
      setStarOpacity(starFade);
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateSky);
    }

    updateSky();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={skyRef} className="sky-fixed" aria-hidden="true" />
      {/* Star field */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ opacity: starOpacity, transition: 'opacity 0.3s ease' }}
        aria-hidden="true"
      >
        {STARS.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
