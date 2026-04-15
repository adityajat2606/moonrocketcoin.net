import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Business listings · moonrocketcoin.net',
  },
  footer: {
    tagline: 'Verified listings and market intelligence',
  },
  hero: {
    badge: 'Latest listings on Moon Rocket Coin',
    title: ['A sharper directory for', 'businesses, venues, and Web3 operators.'],
    description:
      'Scan structured listings, compare trust signals, and move from discovery to contact without noisy feeds or generic marketplace chrome.',
    primaryCta: {
      label: 'Browse business listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'View classifieds',
      href: '/classifieds',
    },
    searchPlaceholder: 'Search listings, categories, cities, and businesses',
    focusLabel: 'Focus',
    featureCardBadge: 'live directory feed',
    featureCardTitle: 'New and updated listings stay in rotation on the homepage.',
    featureCardDescription:
      'The feed prioritizes fresh posts so returning visitors see movement—without changing how underlying tasks or APIs behave.',
  },
  home: {
    metadata: {
      title: 'Moon Rocket Coin — business listings & classifieds',
      description:
        'moonrocketcoin.net is a listing-first directory for businesses, services, and timely classified posts with a minimal, data-forward layout.',
      openGraphTitle: 'Moon Rocket Coin — business listings & classifieds',
      openGraphDescription:
        'Discover verified-style business listings and classifieds on moonrocketcoin.net with clear metadata and fast scanning.',
      keywords: [
        'moonrocketcoin',
        'business listings',
        'classifieds',
        'directory',
        'Web3 business',
        'local discovery',
      ],
    },
    introBadge: 'About this directory',
    introTitle: 'Built for operators who want listings to read like serious business data.',
    introParagraphs: [
      'Moon Rocket Coin foregrounds structured business entries: category, location, contact paths, and supporting context in one calm surface.',
      'Classifieds stay available as a secondary lane for time-sensitive offers without crowding the primary listing experience.',
      'Every task route from the base platform remains available; navigation simply emphasizes what this site is for.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Listing-heavy homepage with horizontal, scan-friendly cards.',
      'Black, crimson, and pale pink system tuned for contrast and restraint.',
      'Secondary lanes and resources linked from the footer and search.',
      'Lightweight motion—no heavy scripts for decoration.',
    ],
    primaryLink: {
      label: 'Open listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
  },
  cta: {
    badge: 'List or inquire',
    title: 'Put your business on the Moon Rocket Coin directory.',
    description:
      'Register to add a listing, or contact the team if you need a structured presence alongside classifieds and other supported formats.',
    primaryCta: {
      label: 'Create account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Newest entries in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Long-form notes and updates from the Moon Rocket Coin network.',
  },
  listing: {
    title: 'Business listings',
    description: 'Structured business and service listings on moonrocketcoin.net.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Offers, notices, and short-term opportunities alongside the main directory.',
  },
  image: {
    title: 'Image sharing',
    description: 'Visual posts and galleries when enabled for this deployment.',
  },
  profile: {
    title: 'Profiles',
    description: 'Public profiles and organization-style pages.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Curated links and saved resources.',
  },
  pdf: {
    title: 'PDF library',
    description: 'Documents and downloadable resources.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings',
    paragraphs: [
      'Each entry is laid out for quick comparison: category, geography, and contact paths read before imagery.',
      'Listings stay connected to the rest of the platform’s tasks, but this surface is tuned for operators and researchers.',
      'Use filters to narrow categories, then open a detail page for the full fact pattern.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Home', href: '/' },
    ],
  },
  article: {
    title: 'Articles & briefings',
    paragraphs: [
      'Articles use a different rhythm from listings: typography leads, imagery stays supportive.',
      'When a story references a business or venue, details are surfaced in a listing-style panel for consistency.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds board',
    paragraphs: [
      'Short, time-sensitive posts sit in a compact board format next to the main listing directory.',
      'Use this lane for offers, gigs, and notices that should not be buried in long-form pages.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Search', href: '/search' },
    ],
  },
  image: {
    title: 'Visual feed',
    paragraphs: [
      'Image-first posts use larger media modules and a darker shell so they feel distinct from the listing directory.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  profile: {
    title: 'Profiles',
    paragraphs: [
      'Identity surfaces for people, brands, and teams—framed separately from listing cards.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  sbm: {
    title: 'Saved resources',
    paragraphs: [
      'Bookmarks and curated links in a text-forward layout that avoids directory card chrome.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  pdf: {
    title: 'Documents',
    paragraphs: [
      'PDFs and downloads with a grid suited to file-style previews.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Brief community signals that complement longer content types.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  comment: {
    title: 'Comments',
    paragraphs: [
      'Threaded responses tied to articles and other supported content.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  org: {
    title: 'Organizations',
    paragraphs: [
      'Team and entity pages with structured fields aligned to the directory tone.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
    ],
  },
}
