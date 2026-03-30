export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;   // Cloudinary public ID
  publishedAt: string;  // ISO date string
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
};
