import type { Gallery } from '@/types/gallery';

export const galleries: Gallery[] = [
  // Add real galleries here. Each entry maps to a Cloudinary folder.
  // Example entries below — replace with your actual shows/shoots.
  {
    slug: 'heilung-red-rocks-2024',
    title: 'Heilung at Red Rocks Amphitheatre 2024',
    description:
      'A placeholder gallery. Replace this with a real show description.',
    coverImage: '_TPW5805-DxO_DeepPRIME_XD2s_swr4ok',
    cloudinaryFolder: 'photos/concerts/heilung',
    date: '2024-04-23',
    city: 'Morrison, CO',
    venue: 'Red Rocks Amphitheatre',
    tags: ['concert', 'metal'],
    featured: true,
    published: true,
  },
];

// Derived helpers https://res.cloudinary.com/df6mhecko/image/upload/v1770144965/_TPW5805-DxO_DeepPRIME_XD2s_swr4ok.jpg

export function getPublishedGalleries(): Gallery[] {
  return galleries.filter((g) => g.published);
}

export function getFeaturedGalleries(): Gallery[] {
  return galleries.filter((g) => g.featured && g.published);
}

export function getGalleryBySlug(slug: string): Gallery | undefined {
  return galleries.find((g) => g.slug === slug);
}

export function getRelatedGalleries(current: Gallery, limit = 3): Gallery[] {
  return getPublishedGalleries()
    .filter(
      (g) =>
        g.slug !== current.slug &&
        g.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, limit);
}
