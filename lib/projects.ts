export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectVideo {
  label: string;
  src?: string;
}

export interface ProjectData {
  title: string;
  tag: string;
  postmark: string;
  context: string;
  stats: ProjectStat[];
  videos: ProjectVideo[];
  previewVideo?: string;
}

export const PROJECTS: Record<string, ProjectData> = {
  truemed: {
    title: 'Truemed',
    tag: 'Fintech \u00b7 Content',
    postmark: 'NYC, NY',
    context:
      'Truemed is a fintech company that makes it possible for people to use their HSA/FSA to actually shop for their health: Pelotons, smart mattresses, red light therapy, saunas.\n\nI started a cinematic customer success story campaign and began building out their UGC.\n\nMy first video became Truemed\'s highest-performing TikTok ever.',
    stats: [
      { value: '#1', label: 'TikTok Performance' },
      { value: '3', label: 'Videos Produced' },
      { value: 'UGC', label: 'Campaign Type' },
    ],
    previewVideo: '/site-media/Videos/truemed/truemed-customer-story.mp4',
    videos: [
      { label: 'Customer Success Story', src: '/site-media/Videos/truemed/truemed-customer-story.mp4' },
      { label: 'UGC Highlight 1', src: '/site-media/Videos/truemed/truemed-ugc-highlight-1.mp4' },
      { label: 'UGC Highlight 2', src: '/site-media/Videos/truemed/truemed-ugc-highlight-2.mp4' },
    ],
  },
  'mgmt-boston': {
    title: 'MGMT Boston',
    tag: 'Startup Events \u00b7 Recurring',
    postmark: 'Boston, MA',
    context:
      'MGMT Boston is the connective tissue of the Boston startup ecosystem. Pitch competitions, networking events, founder meetups.\n\nI capture the energy of these events in a way that makes people wish they were there, and makes the people who were there want to come back.',
    stats: [
      { value: '10+', label: 'Events Covered' },
      { value: 'Recurring', label: 'Partnership' },
    ],
    previewVideo: '/site-media/Videos/mgmt/mgmt-giuseppe-spotlight.mp4',
    videos: [
      { label: 'Giuseppe Spotlight', src: '/site-media/Videos/mgmt/mgmt-giuseppe-spotlight.mp4' },
      { label: 'Industrial Panel', src: '/site-media/Videos/mgmt/mgmt-industrial-panel.mp4' },
      { label: 'Roast My Stack', src: '/site-media/Videos/mgmt/mgmt-roast-my-stack.mp4' },
    ],
  },
  'founder-storytelling': {
    title: 'Founder Storytelling Series',
    tag: 'Original Series \u00b7 Personal Brand',
    postmark: 'Babson / NYC',
    context:
      'Understanding who founders are beyond their product. What makes them tick, what keeps them going, what they wish they knew.\n\nFeaturing founders of Clave, Speakeasy, DamFellows, and DesiEats.',
    stats: [
      { value: '4', label: 'Founders Featured' },
      { value: 'Original', label: 'Series Format' },
    ],
    previewVideo: '/site-media/Videos/founders/this-is-mateo-clave.mp4',
    videos: [
      { label: 'This is Mateo (Clave)', src: '/site-media/Videos/founders/this-is-mateo-clave.mp4' },
      { label: 'This is Faizan (Speakeasy)', src: '/site-media/Videos/founders/this-is-faizan-speakeasy.mp4' },
      { label: 'This is Krish (DamFellows)', src: '/site-media/Videos/founders/this-is-krish-damfellows.mp4' },
      { label: 'This is Krish (DesiEats)', src: '/site-media/Videos/founders/this-is-krish-desieats.mp4' },
    ],
  },
  'cash-flows': {
    title: 'Cash Flows (Stripe Series)',
    tag: 'Educational Content \u00b7 Fintech',
    postmark: 'NYC, NY',
    context:
      'Breaking down complex fintech concepts in a way that feels intuitive, not overwhelming. Making the financial infrastructure that powers the internet feel approachable.',
    stats: [
      { value: 'Stripe', label: 'Featured Platform' },
      { value: 'Edu', label: 'Content Type' },
    ],
    previewVideo: '/site-media/Videos/stripe/cash-flows.mp4',
    videos: [
      { label: 'Cash Flows', src: '/site-media/Videos/stripe/cash-flows.mp4' },
      { label: 'Cash Flows: Crypto', src: '/site-media/Videos/stripe/cash-flows-crypto.mp4' },
    ],
  },
  arcangel: {
    title: 'ArcAngel Pitch Comp',
    tag: 'Events \u00b7 Startup Community',
    postmark: 'Boston, MA',
    context:
      'Event coverage of the ArcAngel pitch competition, including the Ping Boys founder event. Capturing the high-stakes energy of founders putting it all on the line.',
    stats: [
      { value: '1', label: 'Event' },
      { value: 'Live', label: 'Coverage Type' },
    ],
    previewVideo: '/site-media/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4',
    videos: [
      { label: 'Event Overview', src: '/site-media/Videos/ArcAngel Pitch Comp/arcangel-event-overview.mp4' },
      { label: 'Ping Narrative', src: '/site-media/Videos/ArcAngel Pitch Comp/ping-narrative.mp4' },
      { label: 'Interview Spotlight', src: '/site-media/Videos/ArcAngel Pitch Comp/interview-spotlight.mp4' },
      { label: 'Interview Spotlight 2', src: '/site-media/Videos/ArcAngel Pitch Comp/interview-spotlight-2.mp4' },
    ],
  },
  personal: {
    title: 'Personal Content',
    tag: 'Personal Brand \u00b7 7.5M+ Views',
    postmark: 'NYC / Babson',
    context:
      'Soccer and intramural highlight videos, day in the life content, and the barber video that drove 12+ new recurring clients with an estimated $8K projected annual value.\n\nBroader UGC and personal brand content that has generated 7.5M+ organic views across platforms.',
    stats: [
      { value: '7.5M+', label: 'Organic Views' },
      { value: '12+', label: 'Clients (Barber)' },
      { value: '$8K', label: 'Projected Annual Value' },
    ],
    previewVideo: '/site-media/Videos/personal/intramural-soccer.mp4',
    videos: [
      { label: 'Intramural Soccer', src: '/site-media/Videos/personal/intramural-soccer.mp4' },
      { label: 'Day in the Life (OG)', src: '/site-media/Videos/personal/day-in-the-life-og.mp4' },
      { label: 'Pursuit of Happiness', src: '/site-media/Videos/personal/pursuit-of-hapiness.mp4' },
      { label: 'Esto es Miami', src: '/site-media/Videos/personal/esto-es-miami.mp4' },
      { label: 'Chinatown', src: '/site-media/Videos/personal/chinatown.mp4' },
    ],
  },
  'catskills-airbnb': {
    title: 'Catskills Airbnb',
    tag: 'Hospitality \u00b7 Operations',
    postmark: 'Walton, NY',
    context:
      'A profitable Airbnb operation in the Catskills. 40+ stays, 5-star average rating, 90% summer occupancy. Built the listing, managed operations, optimized pricing.',
    stats: [
      { value: '$170K+', label: 'Total Revenue' },
      { value: '5\u2605', label: 'Average Rating' },
      { value: '90%', label: 'Summer Occupancy' },
      { value: '40+', label: 'Stays' },
    ],
    videos: [
      { label: 'Property Tour' },
    ],
  },
};
