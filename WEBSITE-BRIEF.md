# SEYVIK MAGON — Personal Website Build Prompt
## Complete Creative Brief for Claude Code

---

## CRITICAL: READ BEFORE BUILDING ANYTHING

1. Look at `/public/site-media/sunset stages/` for the EXACT sunset gradient colors. These are the source of truth.
2. Look at `/public/site-media/Entergalactic/` for the illustrated location images and style reference.
3. Browse ALL folders in `/public/site-media/` to see what real assets are available. Use them.
4. Read this ENTIRE document before writing any code. Understand the concept first.

---

## WHO THIS IS FOR

Seyvik Magon. 22 years old. Graduating from Babson College (May 2026, BS Finance, 3.83 GPA). Cinematic storyteller, content creator, and versatile operator who runs Pursuit of Happiness Productions. Finance background (Fortress Investment Group, Mantra Investment Partners, Lotus Equity Partners). Runs a profitable Airbnb in the Catskills ($170K+ revenue). Co-founded an e-commerce brand. Generated 7.5M+ organic views.

He is NOT just a videographer. He is NOT just a finance person. He is an extremely valuable, versatile asset who thinks in business and executes in storytelling. The site should make startups, fintech companies, and operators think: "This guy can help us with growth, content, product, whatever we need. And he's a cool person on top of it."

**TONE:** Let the work speak for itself. No explaining why he's great, no selling. Confident through showing, not telling. Copy is conversational, direct, occasionally funny, never corporate. Never generic AI-sounding. NEVER use em dashes anywhere in any copy. Use commas, periods, colons, or line breaks instead.

---

## THE CONCEPT: "THE PURSUIT OF HAPPINESS"

The creative thread that ties the entire site together. "Pursuit of Happiness" is both the name of his production company and a personal philosophy. The site experience should feel like a pursuit, a journey, a story unfolding.

### The Sunset Scroll — CRITICAL IMPLEMENTATION DETAILS

The background should ALWAYS look like a sunset at every scroll position. Every screenful should have warm colors at the bottom and cooler colors at the top, like you're looking at the horizon. The warm glow is always near the bottom of the viewport, the sky above it is always cooler/darker.

What changes as the user scrolls is how far into the sunset we are:

- **Top of page (early sunset):** Light blue sky at top of screen, soft golden/peach at bottom of screen. Bright, warm, optimistic.
- **As you scroll:** The blue at top gets deeper, the warm colors at bottom get richer, more orange, more saturated.
- **Middle of page (peak sunset):** Deep navy at top, rich orange and red at bottom. The most dramatic and beautiful moment.
- **Further down (dusk):** Dark navy/near-black at top, muted warm glow fading at bottom. The sun is setting.
- **Bottom of page (night):** Fully dark. The sunset is over. The warm glow at the bottom is gone or nearly gone.

Think of it like a timelapse of a real sunset. At every single moment, you can tell it's a sunset because the horizon (bottom) is always warmer than the sky above it (top). The scroll just controls what TIME in the sunset you're seeing.

Do NOT make it one continuous tall gradient. Make the viewport itself always contain the full sunset composition (warm bottom, cool top), and shift the entire palette darker as the user scrolls.

**Extract exact hex values from the Figma exports in `/public/site-media/sunset stages/`.** These show the progression from Start_Sky through Stages 2-10.

#### TECHNICAL IMPLEMENTATION (from tested working build):

Use a FIXED viewport-sized element (`.sky-fixed`) with `position: fixed; inset: 0;`. This element displays a multi-stop gradient (radial glow at bottom + multi-stop linear gradient) that updates via CSS variables as you scroll through keyframes.

**Critical z-index rules (these prevent the most common bug):**
- `.sky-fixed`: `z-index: 0` (NEVER use negative z-index, it goes behind body and becomes invisible)
- `main` content: `position: relative; z-index: 2`
- Stars/particles: `z-index: 1`
- Nav: `position: fixed; z-index: 50`
- Body: `background: transparent` (if body has ANY background color or gradient, it occludes the sky element)

**Keyframe structure:** Define 6-8 keyframes, each representing a complete sunset moment with top color, middle color, bottom color, and glow intensity. Use scroll position (0-1) to interpolate between keyframes. Each keyframe should look like a self-contained sunset on its own.

### Entergalactic Visual Language

The site's visual identity is inspired by the Netflix animated special Entergalactic. The illustrated assets in `/public/site-media/Entergalactic/` carry this energy. Claude Code's role is to support that energy through:
- Film grain overlay (CSS noise texture, ~3% opacity) across the entire site
- Organic, fluid animations (not sharp/snappy corporate transitions)
- Soft glowing light effects on hover states and accent elements
- Slightly organic shadows on postcards rather than hard geometric ones

Do NOT try to make text look "painted" or stylized. Do NOT apply weird filters to photos. Do NOT over-style UI elements to the point of abstraction. Text should be clean, confident, easy to read. The illustrated assets and the sunset atmosphere do the Entergalactic work. The CSS supports it.

### NYC Locations — Two Layers

**Layer 1: Postmark stamps on project cards.** Each project postcard has a small, subtle location tag, like a postmark on a real postcard. Small monospace text, slightly rotated, like a rubber stamp. This ties the project to a place without muddying the project identity.

**Layer 2: Entergalactic-style location illustrations on the about page.** Use the images from `/public/site-media/Entergalactic/`:
- **Battery Park City, NYC** (battery-park-city.png)
- **Chelsea, NYC** (chelsea.png)
- **Babson College** (babson-soccer.png)
- **Madrid, Casa de Campo** (madrid-casa-de-campo.png)
- **SF Chinatown** (sf-chinatown.jpg)

When clicked, these expand to reveal Seyvik's actual photos from the corresponding folders (`/nyc/`, `/madrid/`, `/sf/`, `/babson/`).

### The Pigeon
An illustrated pigeon exists at `/public/site-media/Entergalactic/pigeon.png`. Use this as an easter egg: on the 404 page, as a hover animation, or hidden somewhere that makes people smile.

---

## NAVIGATION

Persistent navigation bar (top or side) with direct links to:
- Home
- Projects
- About
- Resume
- Contact

Clean, minimal, always accessible. User should jump to any section at any time.

---

## TYPOGRAPHY

- **Headlines:** Helvetica Neue with system fallbacks: `font-family: "Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif;`
- **Accent/subheadlines/quotes:** Crimson Text Italic from Google Fonts: `font-family: "Crimson Text", Georgia, serif; font-style: italic;`
- **Body text:** Helvetica Neue (same stack as headlines)
- **Labels/postmarks/tags:** JetBrains Mono from Google Fonts: `font-family: "JetBrains Mono", monospace;`

Load Crimson Text (italic only) and JetBrains Mono (400 weight) from Google Fonts. Helvetica Neue is a system font, no loading needed.

---

## SITE STRUCTURE

Multi-page site. Next.js (App Router), Tailwind CSS, Framer Motion.

### Page 1: HOME

**Hero Section:**
```
Seyvik Magon

I create videos that build trust, make complex things click,
and match the ambition of your startup.

New York City. Babson '26. Pursuit of Happiness.
```
- Name large and confident (Helvetica Neue)
- Subline in Crimson Text Italic
- Video content playing cinematically: showreel or looping highlight
- Sunset scroll begins here (brightest point, clear blue sky with warm horizon glow)

**Work Preview Section:**
- Curated grid of project postcards (see Postcard styling below)
- Video thumbnail that plays on hover (reference: itsjay.us)
- Each card has location postmark stamp
- Cards link to individual project pages

**About Teaser:**
```
I'm fascinated by people: what gets them out of bed every morning,
the things that make each of them unique. That fascination turned
into telling the stories of founders, then a way of thinking about
how stories drive growth.

I studied finance and interned as a Private Credit Analyst on
Wall Street. And then I picked up a camera.
```

**Contact CTA:**
```
The work you've put in deserves content that can encapsulate it.

Whether you need an ongoing content partner, a story told right,
or just want to talk about what you're building: I'd love to hear
from you.
```
Email: contact@seyvikmagon.com
Instagram: @seyvikmagon
LinkedIn: /in/seyvikmagon
TikTok: @seyvikmagon07

---

### Page 2: WORK

No intro text. Go straight into the project postcards. Let the work speak.

**Projects:**

1. **Truemed**
   Tag: Fintech · Content
   Postmark: New York City, NY
   Card description: Cinematic customer success stories and UGC for a fintech platform. First video became their #1 TikTok ever.
   
   Project page (Optix House style: short context, big stats, then videos):
   ```
   Truemed

   Truemed is a fintech company that makes it possible for people to
   use their HSA/FSA to actually shop for their health: Pelotons,
   smart mattresses, red light therapy, saunas.

   I started a cinematic customer success story campaign and began
   building out their UGC.

   My first video became Truemed's highest-performing TikTok ever.
   ```
   Stats displayed big and visual: #1 TikTok, [other metrics]
   Then 2-3 video embeds.

2. **MGMT Boston**
   Tag: Startup Events · Recurring
   Postmark: Boston, MA
   Description: Capturing the energy of the Boston startup ecosystem across pitch competitions, networking events, and founder meetups.

3. **Founder Storytelling Series**
   Tag: Original Series · Personal Brand
   Postmark: Babson / NYC
   Description: Understanding who founders are beyond their product. Featuring founders of Clave, Speakeasy, DamFellows, and DesiEats.

4. **Cash Flows (Stripe Series)**
   Tag: Educational Content · Fintech
   Postmark: New York City, NY
   Description: Breaking down complex fintech concepts in a way that feels intuitive, not overwhelming.

5. **ArcAngel Pitch Comp**
   Tag: Events · Startup Community
   Postmark: Boston, MA
   Description: Event coverage of the ArcAngel pitch competition, including the Ping Boys founder event.

6. **Personal Content**
   Tag: Personal Brand · 7.5M+ Views
   Postmark: New York City / Babson
   Sub-sections:
   - Soccer & intramural highlight vids
   - Day in the life content
   - The barber video (drove 12+ new recurring clients, ~$8K projected annual value)
   - Broader UGC and personal brand content

7. **Catskills Airbnb**
   Tag: Hospitality · Operations
   Postmark: Walton, NY
   Description: 40+ stays, 5-star average, 90% summer occupancy, $170K+ total revenue.

---

### Page 3: Individual Project Pages (template)

Follow the Optix House model (optix.house): short context paragraph about the client, stats displayed big and visual, then the actual videos. Three layers: context, proof, work. No long narratives.

Stats should POP visually: large numbers, clean layout, impossible to miss. The videos do most of the talking.

---

### Page 4: ABOUT

Keep lean. No origin story. Who he is, what he's done, locations.

```
I'm fascinated by people: what gets them out of bed every morning,
the things that make each of them unique. That fascination turned
into telling the stories of founders, then a way of thinking about
how stories drive growth.

I studied finance at Babson. I interned at Fortress Investment Group
doing private credit, at Mantra Investment Partners doing private
equity, at Lotus Equity Partners doing commercial real estate. I
studied abroad in Madrid at IE University.

And then I picked up a camera.

I also run an Airbnb in the Catskills that's generated $170K+ in
revenue. I co-founded an e-commerce brand that turned $4K+ in
profit in three months. I captain the Babson club soccer team and
secured $19K+ in funding for the program.

Currently based in New York City. Graduating May 2026.
```

**Locations Section:** Display the Entergalactic illustrations from `/public/site-media/Entergalactic/`. Each shows the painterly illustration as default. Click/tap expands to reveal real photos from corresponding site-media folders.

---

### Page 5: RESUME

Clean, on-page, styled to match site design. PDF download button.

EDUCATION:
- Babson College: BS Finance, 3.83 GPA, May 2026. Dean's List 2022-2025.
- IE University Madrid: BBA Exchange, Spring 2025. VC thesis to K Fund.

EXPERIENCE:
- Fortress Investment Group: Private Credit Summer Analyst (June-Aug 2025)
- Mantra Investment Partners: Private Equity Analyst (June-Aug 2024)
- Lotus Equity Partners: Commercial Real Estate Analyst (June-Aug 2023)
- Cornerstone Legacy Financial Advisors: Tax Intern (Jan-May 2024)

LEADERSHIP:
- Pursuit of Happiness Productions: Founder (June 2025-Present)
- Babson Club Soccer: Captain (Aug 2023-Present)
- Catskills Airbnb: Manager (June 2023-Present)
- A-Wear: Co-Founder & CTO (Jan-May 2023)

SKILLS: Financial Modeling, Excel, SQL, Data Analysis, PowerPoint, Market Research

---

### Page 6: CONTACT

```
The work you've put in deserves content that can encapsulate it.

Whether you need an ongoing content partner, a story told right,
or just want to talk about what you're building: I'd love to hear
from you.
```

Email: contact@seyvikmagon.com
Instagram: @seyvikmagon
LinkedIn: /in/seyvikmagon
TikTok: @seyvikmagon07

---

## DESIGN SPECIFICATIONS

### Postcard / Card System

ALL content sits inside postcard-style cards on top of the sunset sky background.

**Card styling:**
- Background: off-white/cream paper texture feel. Use `background-color: rgba(252, 250, 245, 0.85)` with `backdrop-filter: blur(16px)` on light sky sections. On dark sky sections, shift to `background-color: rgba(30, 26, 22, 0.75)` with `backdrop-filter: blur(16px)`.
- The card surface should feel like real postcard paper stock: slightly warm, slightly textured. Add a very subtle CSS noise texture or paper grain effect to the card background.
- Border: very subtle, `1px solid rgba(0,0,0,0.06)` on light cards, `1px solid rgba(255,255,255,0.08)` on dark cards
- Border-radius: 8-12px (slightly rounded, like real postcards, not pill-shaped)
- Shadow: realistic paper shadow, `0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)`. Should feel like a physical card casting a soft shadow.
- Padding: generous (24-32px)
- Slight tilt/rotation on hover (1-2 degrees) for a tactile, physical feel
- Location postmark: JetBrains Mono, small (11-12px), slightly rotated (2-3 degrees), looks like a rubber stamp. Maybe a subtle circular border around the text.

**Cards should feel like physical postcards** sitting in front of a sunset sky. Leave breathing room at the edges of the viewport so the sky gradient peeks through around the cards.

### Color

**Sky gradient:** Extract from Figma exports in `/public/site-media/sunset stages/`. See Sunset Scroll section above.

**Accent colors:**
- Teal/Cyan: #00D4E0 (links, highlighted keywords, interactive elements)
- Warm Yellow: #E8D44D (secondary highlights, emphasis, hover states)
- Test contrast against BOTH light sky and dark sky sections

**Text on cards:**
- Light cards: near-black (#1A1A1A)
- Dark cards: warm white (#F5F0E8)

### Layout
- Generous whitespace
- Sky background always visible around card edges
- Full-width video sections can break out of cards
- Asymmetric layouts where appropriate
- Scroll-triggered animations: Framer Motion (fade up, parallax, cards sliding in from sides)
- Video hover-to-play on project cards (reference: itsjay.us)
- Cards can be slightly staggered or overlapping for visual interest

### Atmosphere
- Film grain overlay: CSS noise texture, ~3% opacity, site-wide
- As user scrolls into night section, subtle star/particle elements emerge behind cards
- Animations should feel organic and fluid, not sharp or corporate

### Mobile
Fully responsive. Sunset scroll works on mobile. Video hover-to-play becomes tap-to-play. Nav becomes hamburger menu.

---

## TECH STACK

- Next.js 14+ (App Router)
- Tailwind CSS
- Framer Motion
- Google Fonts: Crimson Text (italic), JetBrains Mono (400)
- Deploy to Vercel

---

## FILE STRUCTURE

```
/public/site-media/
  /babson/                 Photos
  /broll/                  B-roll stills
  /Entergalactic/          Illustrated locations + pigeon + portrait illustrations
  /headshots/              Photos of Seyvik
  /madrid/                 Madrid photos
  /nyc/                    NYC photos
  /sf/                     SF photos
  /sunset stages/          FIGMA EXPORTS (source of truth for gradient colors)
  /sunsets/                Real sunset photos
  /upstate new york/       Catskills photos
  /Videos/                 (may not be in repo due to .gitignore, but exist locally)
    /ArcAngel Pitch Comp/
    /founders/
    /mgmt/
    /personal/
    /stripe/               Cash Flows series
    /truemed/
```

Browse these folders. Use actual assets. For missing media, use clearly labeled placeholder elements with the expected filename.

**VIDEO: TWO PASSES.** First pass: thumbnail image placeholders with play button overlay. Second pass: wire up hover-to-play, autoplay, lazy loading after layout is confirmed.

---

## REFERENCE SITES

1. **sarahchieng.com**: multi-dimensional credibility stacking, warm, personal
2. **computercomputercomputer.computer** (Bo Lau): personality IS the design
3. **josephmains.com**: case study depth with narrative voice
4. **itsjay.us**: video hover-to-play, site as portfolio piece, bold confidence
5. **juliaalvarenga.com**: interactive card-based elements, tactile feel
6. **optix.house**: project page format (short context, big stats, then videos)

---

## IMPORTANT RULES

- NEVER use em dashes in any text on the site. Use commas, periods, colons, or line breaks.
- Design reference (sunset stages, Entergalactic folder) is the source of truth for visual decisions.
- Use actual assets from site-media folders wherever they exist.
- The site itself IS a portfolio piece. It should impress.
- Text is clean and readable. NOT stylized or abstract. The illustrated assets carry the visual energy.
- Videos play natively, not as YouTube/Vimeo embeds.
- Resume is integrated into site design with PDF download.
- Pigeon easter egg somewhere delightful.
- All text lives in a central content file or clearly labeled components for easy editing later.
- No impact strip / stats section on the home page.
- No intro text on the work page.
- No origin story on the about page.
- Postcard location stamps on every project card.

---

## BUILD ORDER

1. Project scaffolding (Next.js, Tailwind, Framer Motion, Google Fonts setup)
2. The sunset scroll system (CRITICAL: use fixed viewport element, correct z-index layering, extract colors from Figma stages)
3. Navigation bar
4. Home page: hero, work preview postcards, about teaser, contact CTA
5. Work page with project postcards (hover-to-play placeholders, postmark stamps)
6. One project page template (Truemed, Optix House style)
7. About page with Entergalactic location illustrations
8. Resume page
9. Contact page
10. Polish: animations, grain overlay, star particles, pigeon easter egg
