import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getPublishedGalleries } from "@/data/galleries";
import { getAllJournalPosts } from "@/lib/mdx/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const galleryRoutes: MetadataRoute.Sitemap = getPublishedGalleries().map(
    (gallery) => ({
      url: `${base}/gallery/${gallery.slug}`,
      lastModified: gallery.date,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const journalRoutes: MetadataRoute.Sitemap = getAllJournalPosts().map(
    (post) => ({
      url: `${base}/journal/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...galleryRoutes, ...journalRoutes];
}
