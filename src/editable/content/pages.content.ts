import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Discover Local Businesses & Services',
      description: 'Find and connect with trusted local businesses, services, and professionals on Esohbetsitesi — your comprehensive business listing platform.',
      openGraphTitle: 'Discover Local Businesses & Services | Esohbetsitesi',
      openGraphDescription: 'Browse verified business listings, read community reviews, and discover local services on Esohbetsitesi.',
      keywords: ['business listings', 'local businesses', 'business directory', 'find services', 'business reviews'],
    },
    hero: {
      badge: 'Trusted by thousands',
      title: ['Build connections where', 'business never stops.'],
      description: 'Discover local businesses, connect with service providers, and grow your network through our comprehensive business listing platform.',
      primaryCta: { label: 'Browse Listings', href: '/listing' },
      secondaryCta: { label: 'Add Your Business', href: '/create' },
      searchPlaceholder: 'Search businesses, services, locations...',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured listings',
      featureCardTitle: 'Verified businesses updated daily.',
      featureCardDescription: 'Fresh business listings and services added regularly to keep our directory comprehensive and current.',
    },
    intro: {
      badge: 'About our platform',
      title: 'A smarter way to discover and connect with local businesses.',
      paragraphs: [
        'Our platform brings together business listings, service profiles, and community reviews to help you find exactly what you need.',
        'From restaurants and retailers to professional services and creative agencies, every listing is designed for easy discovery and quick comparison.',
        'Whether you are searching for a new service provider or looking to list your own business, our platform makes the process seamless.',
      ],
      sideBadge: 'Platform highlights',
      sidePoints: [
        'Verified business profiles with detailed information and contact details.',
        'Community-driven reviews and ratings for transparent decision making.',
        'Category-based browsing with smart filters for faster discovery.',
        'Mobile-optimized experience for on-the-go business search.',
      ],
      primaryLink: { label: 'Browse all listings', href: '/listing' },
      secondaryLink: { label: 'View articles', href: '/article' },
    },
    cta: {
      badge: 'Get started today',
      title: 'Ready to grow your business visibility?',
      description: 'List your business on Esohbetsitesi and connect with customers who are actively looking for your services.',
      primaryCta: { label: 'Add Your Business', href: '/create' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'Building a better way to discover businesses.',
    description: `${slot4BrandConfig.siteName} is your go-to platform for finding and connecting with local businesses, services, and professionals in your area.`,
    paragraphs: [
      'We believe every business deserves visibility. Our platform makes it easy for businesses of all sizes to create professional listings and reach potential customers.',
      'With detailed profiles, community reviews, and smart discovery tools, we help businesses and consumers find each other effortlessly.',
    ],
    values: [
      {
        title: 'Trusted Discovery',
        description: 'Every listing is designed for clarity and trust, with verified details, ratings, and authentic community reviews.',
      },
      {
        title: 'Comprehensive Coverage',
        description: 'From local shops to professional services, our directory covers every category to ensure complete business coverage.',
      },
      {
        title: 'Easy to Use',
        description: 'Clean navigation, powerful search, and intuitive filters make finding the right business quick and effortless.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'We are here to help you grow.',
    description: 'Whether you want to list your business, report an issue, or explore partnership opportunities, our team is ready to assist you.',
    formTitle: 'Send us a message',
  },
  search: {
    metadata: {
      title: 'Search Businesses & Services',
      description: 'Search and discover businesses, services, articles, and resources across Esohbetsitesi.',
    },
    hero: {
      badge: 'Search directory',
      title: 'Find exactly what you need.',
      description: 'Use keywords, categories, and filters to discover businesses and services from every section of our platform.',
      placeholder: 'Search by business name, service, or location...',
    },
    resultsTitle: 'Browse all listings',
  },
  create: {
    metadata: {
      title: 'Add Your Business',
      description: 'Create a professional business listing and reach new customers on Esohbetsitesi.',
    },
    locked: {
      badge: 'Account required',
      title: 'Sign in to list your business.',
      description: 'Create an account or sign in to add your business listing and start connecting with potential customers.',
    },
    hero: {
      badge: 'Business listing',
      title: 'Add your business to our directory.',
      description: 'Choose the content type, add your business details, and create a professional listing with images, contact info, and description.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Submit listing',
    successTitle: 'Your listing has been submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your Esohbetsitesi account.',
      badge: 'Welcome back',
      title: 'Sign in to manage your listings.',
      description: 'Access your business dashboard, manage listings, and track your performance from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account found with these credentials. Please create an account first.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your Esohbetsitesi account.',
      badge: 'Join us',
      title: 'Create your account and start listing.',
      description: 'Join Esohbetsitesi to list your business, manage your profile, and connect with customers looking for your services.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Password must be at least 4 characters.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Similar businesses',
      fallbackTitle: 'Business details',
    },
    image: {
      relatedTitle: 'Related photos',
      fallbackTitle: 'Photo details',
    },
    profile: {
      relatedTitle: 'Similar profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Website',
    },
  },
} as const
