export interface ProjectVideo {
  label: string;
  src?: string;
}

export interface ProjectData {
  title: string;
  tag: string;
  postmark: string;
  context: string;
  videos: ProjectVideo[];
  previewVideo?: string;
}

export const PROJECTS: Record<string, ProjectData> = {
  truemed: {
    title: 'Truemed',
    tag: 'Fintech · Content',
    postmark: 'NYC, NY',
    context:
      'Truemed is a payments platform that makes it simple for people to use their pre-tax dollars on preventative health products like a Peloton, smart mattresses, red light therapy, even a cold plunge. In December 2025, Truemed closed a $34 million Series A led by a16z after experiencing 3x revenue growth for two consecutive years.\n\nTheir next unlock wasn\'t the product. It was cultural awareness. Recognizing that Truemed\'s happiest customers were an underutilized growth channel, I launched a customer success story campaign to sit down with people like Stephanie who transformed their lives through preventative health and tell those stories cinematically.\n\nI built out a content strategy across three verticals designed to drive trust and awareness in a space most Americans know almost nothing about.\n\nThe result: Truemed\'s highest-engagement Instagram Reel (8.2K views, 252 interactions, 30 saves), and their top-performing TikTok and YouTube Short.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-customer-story.mp4',
    videos: [
      { label: 'Customer Success Story', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-customer-story.mp4' },
      { label: 'UGC Highlight 1', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-ugc-highlight-1.mp4' },
      { label: 'UGC Highlight 2', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-ugc-highlight-2.mp4' },
    ],
  },
  'mgmt-boston': {
    title: 'MGMT Boston',
    tag: 'Startup Events · Recurring',
    postmark: 'Boston, MA',
    context:
      'I worked directly with Matt Crane, the founder of MGMT Boston, to support his larger goal: help grow the Boston startup ecosystem.\n\nThis meant going to pitch comps, networking events, founder meetups, and telling these stories. My goal was to capture the energy of these events in a way that makes people wish they were there, and makes the people who were there want to come back.\n\nDuring my time with Matt, MGMT became the connective tissue of the Boston startup ecosystem. The next stop is New York City.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-giuseppe-spotlight.mp4',
    videos: [
      { label: 'Roast My Stack', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-roast-my-stack.mp4' },
      { label: 'Industrial Panel', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-industrial-panel.mp4' },
      { label: 'Giuseppe Spotlight', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-giuseppe-spotlight.mp4' },
    ],
  },
  'founder-storytelling': {
    title: 'Founder Storytelling Series',
    tag: 'Original Series · Personal Brand',
    postmark: 'Babson / NYC',
    context:
      'This is a series where I tell the stories of the most ambitious type of person: founders.\n\nI\'m fascinated with who these people are beyond their product. How do you deal with the stressful road you are taking, and what gets you out of bed every morning to do it?\n\nThis is my attempt at getting to the bottom of those questions.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-mateo-clave.mp4',
    videos: [
      { label: 'Mateo, Clave', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-mateo-clave.mp4' },
      { label: 'Faizan, Speakeasy', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-faizan-speakeasy.mp4' },
      { label: 'Krish, DamFellows', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-damfellows.mp4' },
      { label: 'Krish, DesiEats', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-desieats.mp4' },
    ],
  },
  'cash-flows': {
    title: 'Cash Flows (Stripe Series)',
    tag: 'Educational Content · Fintech',
    postmark: 'NYC, NY',
    context:
      'The biggest bottleneck to widespread adoption of anything is complexity, or at least, the perception of it.\n\nStripe sits at the center of the payments ecosystem, powering how money moves. Faster settlement, safer transactions, infrastructure built to scale. The financial infrastructure that powers the internet is deeply important, but most people have no idea how any of it works.\n\nThese videos are my attempt to change that. Breaking down complex fintech concepts in a way that actually makes sense.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows.mp4',
    videos: [
      { label: 'Cash Flows', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows.mp4' },
      { label: 'Cash Flows: Crypto', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows-crypto.mp4' },
    ],
  },
  arcangel: {
    title: 'ArcAngel Pitch Comp',
    tag: 'Events · Startup Community',
    postmark: 'Boston, MA',
    context:
      'ArcAngel and SHOPLINE hosted a $100,000 pitch competition at Silicon Valley Bank, bringing startups from across the country to compete.\n\nI was brought on to cover the event. But the best media not only encapsulates, but elevates. I took care of event coverage, adding to the energy with founder interviews, and weaved in a narrative following an up and coming startup, ping!',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4',
    videos: [
      { label: 'Event Overview', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4' },
      { label: 'Ping Narrative', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/ping-narrative.mp4' },
      { label: 'Interview Spotlight', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/interview-spotlight.mp4' },
      { label: 'Interview Spotlight 2', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/interview-spotlight-2.mp4' },
    ],
  },
};
