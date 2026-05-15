export const siteConfig = {
  name: 'Thomas Woroniak Photography',
  description: 'Concert, editorial, and event photography.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  ogImage: '/og-default.jpg',
  social: {
    instagram: null as string | null,
    twitter: null as string | null,
  },
};

export const navLinks = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
