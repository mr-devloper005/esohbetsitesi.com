import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Articles & Guides',
    headline: 'In-depth articles, guides, and business insights.',
    description: 'Explore expert articles, how-to guides, and industry insights that help businesses and consumers make informed decisions.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Browse articles by category to find exactly what you need.',
    chips: ['Business tips', 'Industry insights', 'How-to guides'],
  },
  classified: {
    eyebrow: 'Marketplace',
    headline: 'Fresh offers, deals, and time-sensitive listings.',
    description: 'Browse classified listings for products, services, and special offers from verified businesses and individuals.',
    filterLabel: 'Filter by category',
    secondaryNote: 'Find great deals and opportunities near you.',
    chips: ['Deals', 'Offers', 'Local services'],
  },
  sbm: {
    eyebrow: 'Saved Resources',
    headline: 'Curated bookmarks and useful business resources.',
    description: 'Discover curated collections of tools, references, and resources that help businesses grow and professionals stay informed.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Explore organized collections of the best business resources.',
    chips: ['Tools', 'Resources', 'References'],
  },
  profile: {
    eyebrow: 'Business Profiles',
    headline: 'Discover businesses, professionals, and service providers.',
    description: 'Browse profiles of local businesses, freelancers, and professionals to find the right partner for your needs.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Find trusted professionals and verified business profiles.',
    chips: ['Verified', 'Professionals', 'Local businesses'],
  },
  pdf: {
    eyebrow: 'Document Library',
    headline: 'Downloadable guides, reports, and reference documents.',
    description: 'Access a library of business documents, industry reports, and downloadable guides for your professional needs.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Download reports, templates, and reference materials.',
    chips: ['Reports', 'Guides', 'Templates'],
  },
  listing: {
    eyebrow: 'Business Directory',
    headline: 'Find and compare local businesses and services.',
    description: 'Search our comprehensive business directory to discover, compare, and connect with verified local businesses and service providers.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Compare businesses by ratings, location, and services offered.',
    chips: ['Verified listings', 'Compare', 'Local discovery'],
  },
  image: {
    eyebrow: 'Photo Gallery',
    headline: 'Visual showcase of businesses, events, and locations.',
    description: 'Browse high-quality photos from businesses, community events, and local attractions in our visual gallery.',
    filterLabel: 'Filter by category',
    secondaryNote: 'Discover businesses through their best visual content.',
    chips: ['Business photos', 'Events', 'Local spots'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
