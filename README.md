# seyvik-site

Personal portfolio website for Seyvik Magon — cinematographer, content creator, and entrepreneur. Built as a cinematic storytelling experience with a sunset timelapse scroll effect, video-first project showcases, and an Entergalactic-inspired illustrated aesthetic.

## Live Demo

[seyvikmagon.com](https://seyvikmagon.com)

## Features

- **Sunset Scroll System** — Fixed viewport background that shifts through a full sunset-to-night color palette as the user scrolls, driven by CSS variables and JavaScript scroll tracking
- **Video-First Project Cards** — Grayscale-to-color hover reveals with auto-playing preview videos and a 4:5 postcard aspect ratio
- **Scroll-Triggered Animations** — Framer Motion fade-up reveals with staggered timing across all pages
- **Film Grain Overlay** — Subtle CSS noise texture applied site-wide for a cinematic feel
- **Responsive Design** — Mobile-first layout with adaptive grid, hamburger nav, and optimized video loading
- **Lightbox Video Player** — Expanded video viewer with full playback controls
- **Entergalactic-Inspired Illustrations** — Custom illustrated location assets on the About page

## Technologies Used

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Media Hosting:** Cloudflare R2 (CDN)
- **Deployment:** Vercel
- **Image Optimization:** Next.js Image with WebP format

## AI Tools Used

- **Claude Code (Anthropic)** — Used throughout development for component architecture, animation logic, responsive styling, debugging, and iterative design refinement

## Challenges

- **Sunset Scroll Performance** — Achieving smooth real-time color transitions across 10 keyframes without jank required careful optimization of CSS variable updates and minimizing repaints
- **Video Autoplay on Mobile** — Balancing preview video autoplay behavior across browsers and devices while keeping page load fast with lazy loading and `preload="metadata"`
- **Postcard Design System** — Creating a cohesive card system that works across light/dark contexts with consistent shadows, borders, and hover states
- **Color Palette Extraction** — Translating Figma sunset gradient exports into a programmatic scroll-driven system with smooth interpolation

## Future Improvements

- Add more project case studies with behind-the-scenes breakdowns
- Implement page transitions with shared layout animations
- Add a blog/journal section for documenting the creative process
- Integrate analytics to track video engagement per project
- Add dark/light mode toggle independent of scroll position
- Optimize video compression and implement adaptive bitrate streaming
