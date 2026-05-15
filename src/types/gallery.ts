export type Gallery = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;        // Cloudinary public ID
  cloudinaryFolder: string;  // e.g. "photography/concerts/hate-bottleneck-2026"
  date: string;              // ISO date string
  city: string;
  venue?: string;
  client?: string;
  tags: string[];
  featured?: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
};
