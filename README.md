# Thomas Woroniak Photography

A full-stack photography platform for concert, editorial, and event work. Built with Next.js App Router, Cloudinary, and SCSS Modules.

## Stack

- **Next.js 16** — App Router, TypeScript, static generation
- **Cloudinary** — image storage, CDN delivery, transformations
- **next-cloudinary** — `CldImage` component for optimized rendering
- **SCSS Modules** — component-scoped styles with a global design token layer
- **MDX** — journal/blog posts via `next-mdx-remote` + `gray-matter`
- **Vercel** — deployment

## Features

- Dynamic gallery pages with full-screen lightbox
- Responsive image grid pulled from Cloudinary folders
- Per-gallery SEO: `generateMetadata`, Open Graph, Twitter card
- MDX journal with frontmatter-driven metadata
- Contact form with server-side API route
- Sitemap and robots.txt auto-generated from published content
- Dark editorial design system with SCSS design tokens

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard → Settings → API Keys |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard → Settings → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard → Settings → API Keys |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://yoursite.com` |

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is required to run the dev server. The API key and secret are only needed when fetching gallery image lists.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Content

### Galleries

Add entries to `src/data/galleries.ts`. Set `published: true` when ready to go live.

```ts
{
  slug: "band-venue-year",
  title: "Band at Venue",
  description: "...",
  coverImage: "your-cloudinary-public-id",
  cloudinaryFolder: "concerts/band-venue-year",
  date: "2026-01-15",
  city: "Kansas City, MO",
  venue: "Venue Name",
  tags: ["concert", "metal"],
  featured: true,
  published: true,
}
```

The `coverImage` value is the Cloudinary **public ID** — the path shown in the Media Library, without extension or version prefix.

### Journal posts

Add `.mdx` files to `src/content/journal/` with this frontmatter:

```md
---
title: "Post title"
slug: "post-slug"
excerpt: "Short summary."
coverImage: "your-cloudinary-public-id"
publishedAt: "2026-03-10"
tags: ["concert photography"]
---
```

### Cloudinary organization

Recommended folder structure:

```
photography/
  concerts/
    band-venue-year/
  editorial/
    session-name/
  featured/
```

Tag images with `featured` to surface them in the homepage featured section. Add `alt` and `caption` context fields in the Cloudinary Media Library for accessibility and lightbox captions.

## Project Structure

```
src/
  app/              # Routes (App Router)
  components/
    layout/         # Header, Footer, MobileNav
    gallery/        # GalleryCard, GalleryGrid, GalleryHero, ImageGrid, Lightbox...
    journal/        # JournalCard, JournalGrid, ArticleContent
    ui/             # Button, Container, SectionHeading, Badge...
  content/
    journal/        # MDX posts
  data/             # galleries.ts, services.ts, site.ts (editorial config)
  lib/
    cloudinary/     # SDK init + image fetching utilities
    seo/            # metadata builder helpers
    utils/          # formatDate, slugify, cn
  styles/           # Global SCSS tokens, reset, typography
  types/            # TypeScript types for Gallery, GalleryImage, JournalPost
```

## Build

```bash
npm run build
```

The build will fail without `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` set, as `CldImage` requires it at compile time.

## Deployment

Deploy to [Vercel](https://vercel.com). Set all environment variables from `.env.local.example` in the Vercel project settings under **Settings → Environment Variables**.
