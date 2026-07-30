import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Business listing platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Business listing platform',
    primaryLinks: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Visuals', href: '/image-sharing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Explore listings', href: '/' },
      secondary: { label: 'Submit', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Your trusted business listing platform',
    description: 'Discover and connect with local businesses, services, and professionals. Browse listings, read reviews, and find the right match for your needs.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Business Listings', href: '/listings' },
          { label: 'Articles & Guides', href: '/articles' },
          { label: 'Photo Gallery', href: '/image-sharing' },
          { label: 'Resources', href: '/pdf' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Connecting businesses with their audience since day one.',
  },
  commonLabels: {
    readMore: 'Learn more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
