export interface ProjectVideo {
  label: string;
  src?: string;
  poster?: string;
}

export interface ProjectData {
  title: string;
  tag: string;
  postmark: string;
  context: string;
  videos: ProjectVideo[];
  previewVideo?: string;
  previewPoster?: string;
}

export const PROJECTS: Record<string, ProjectData> = {
  'rho-events': {
    title: 'Rho Events',
    tag: 'Event Storytelling · Rho',
    postmark: 'SF · Boston · NYC',
    context:
      'I shoot event storytelling videos across San Francisco, Boston, and New York with Rho, a business banking platform for startups. 95% of startup events don\'t receive media coverage, and if they do it can\'t capture the energy that was in these rooms. I can.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/rho/f.inc%20open%20campus.mov',
    previewPoster: '/project-posters/video-placeholder.svg',
    videos: [
      { label: 'Founders Inc — Open Campus', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/rho/f.inc%20open%20campus.mov', poster: '/project-posters/video-placeholder.svg' },
      { label: 'Z Fellows', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/rho/Z-fellows%20Vlog.mov', poster: '/project-posters/video-placeholder.svg' },
      { label: 'NYC to SF', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/rho/nyc%20to%20sf.mov', poster: '/project-posters/video-placeholder.svg' },
      { label: 'Founders Inc — Offseason II Festival', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/rho/Offseason%20II%20Festival.mov', poster: '/project-posters/video-placeholder.svg' },
    ],
  },
  truemed: {
    title: 'Truemed',
    tag: 'Fintech · Content',
    postmark: 'NYC, NY',
    context:
      'In less than 30 days I produced Truemed\'s highest-engagement Instagram Reel (14K views, 400 interactions, 42 saves), and their top-performing TikTok and YouTube Short.\n\nTruemed is a health payments platform that recently closed a $34 million Series A led by a16z after experiencing 3x revenue growth for two consecutive years.\n\nTheir next unlock was cultural awareness. Recognizing that Truemed\'s happiest customers were an underutilized growth channel, I launched a customer success story campaign to sit down with people like Stephanie who transformed their lives through preventative health and tell those stories.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-customer-story.mp4',
    previewPoster: '/project-posters/truemed-customer-story.jpg',
    videos: [
      { label: 'Customer Success Story', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-customer-story.mp4', poster: '/project-posters/truemed-customer-story.jpg' },
      { label: 'UGC Highlight 1', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-ugc-highlight-1.mp4', poster: '/project-posters/truemed-ugc-1.jpg' },
      { label: 'UGC Highlight 2', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/truemed/truemed-ugc-highlight-2.mp4', poster: '/project-posters/truemed-ugc-2.jpg' },
    ],
  },
  'mgmt-boston': {
    title: 'MGMT Boston',
    tag: 'Startup Events · Recurring',
    postmark: 'Boston, MA',
    context:
      'I worked directly with Matt Crane, the founder of MGMT Boston, to support his larger goal: help grow the Boston startup ecosystem.\n\nThis meant going to pitch comps, networking events, founder meetups, and telling these stories. My goal was to capture the energy of these events in a way that makes people wish they were there, and makes the people who were there want to come back.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-roast-my-stack.mp4',
    previewPoster: '/project-posters/mgmt-roast-my-stack.jpg',
    videos: [
      { label: 'Roast My Stack', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-roast-my-stack.mp4', poster: '/project-posters/mgmt-roast-my-stack.jpg' },
      { label: 'Industrial Panel', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-industrial-panel.mp4', poster: '/project-posters/mgmt-industrial-panel.jpg' },
      { label: 'Giuseppe Spotlight', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/mgmt/mgmt-giuseppe-spotlight.mp4', poster: '/project-posters/mgmt-giuseppe.jpg' },
    ],
  },
  'founder-storytelling': {
    title: 'Founder Storytelling Series',
    tag: 'Original Series · Personal Brand',
    postmark: 'Babson / NYC',
    context:
      'This is a series where I tell the stories of the most ambitious type of person: founders.\n\nI\'m fascinated with who these people are beyond their product. How do you deal with the stressful road you are taking, and what gets you out of bed every morning to do it?\n\nThis is my attempt at getting to the bottom of those questions.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-desieats.mp4',
    previewPoster: '/project-posters/founder-krish-desieats.jpg',
    videos: [
      { label: 'Krish Khemlani, Desi Eats', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-desieats.mp4', poster: '/project-posters/founder-krish-desieats.jpg' },
      { label: 'Mateo Acosta-Rubio, Clave AI', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-mateo-clave.mp4', poster: '/project-posters/founder-mateo.jpg' },
      { label: 'Faizan Asif, Speakeasy', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-faizan-speakeasy.mp4', poster: '/project-posters/founder-faizan.jpg' },
      { label: 'Krish Bhatia, Bobby Browser', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/founders/this-is-krish-damfellows.mp4', poster: '/project-posters/founder-krish-bhatia.jpg' },
    ],
  },
  'cash-flows': {
    title: 'Cash Flows (Stripe Series)',
    tag: 'Educational Content · Fintech',
    postmark: 'NYC, NY',
    context:
      'The biggest bottleneck to widespread adoption of anything is complexity, or at least, the perception of it.\n\nStripe sits at the center of the payments ecosystem, powering how money moves. Faster settlement, safer transactions, infrastructure built to scale. The financial infrastructure that powers the internet is deeply important, but most people have no idea how any of it works.\n\nThese videos are my attempt to change that. Breaking down complex fintech concepts in a way that actually makes sense.',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows.mp4',
    previewPoster: '/project-posters/cash-flows.jpg',
    videos: [
      { label: 'Cash Flows', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows.mp4', poster: '/project-posters/cash-flows.jpg' },
      { label: 'Cash Flows: Crypto', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/stripe/cash-flows-crypto.mp4', poster: '/project-posters/cash-flows-crypto.jpg' },
    ],
  },
  arcangel: {
    title: 'ArcAngel Pitch Comp',
    tag: 'Events · Startup Community',
    postmark: 'Boston, MA',
    context:
      'ArcAngel and SHOPLINE hosted a $100,000 pitch competition at Silicon Valley Bank, bringing startups from across the country to compete.\n\nI was brought on to cover the event. But the best media not only encapsulates, but elevates. I took care of event coverage, adding to the energy with founder interviews, and weaved in a narrative following an up and coming startup, ping!',
    previewVideo: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4',
    previewPoster: '/project-posters/arcangel-overview.jpg',
    videos: [
      { label: 'Event Overview', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4', poster: '/project-posters/arcangel-overview.jpg' },
      { label: 'Ping Narrative', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/ping-narrative.mp4', poster: '/project-posters/arcangel-ping.jpg' },
      { label: 'Interview Spotlight', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/interview-spotlight.mp4', poster: '/project-posters/arcangel-interview-1.jpg' },
      { label: 'Interview Spotlight 2', src: 'https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/Videos/ArcAngel Pitch Comp/interview-spotlight-2.mp4', poster: '/project-posters/arcangel-interview-2.jpg' },
    ],
  },
};
