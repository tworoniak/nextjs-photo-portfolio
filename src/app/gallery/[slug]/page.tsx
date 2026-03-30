import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryMeta from "@/components/gallery/GalleryMeta";
import ImageGrid from "@/components/gallery/ImageGrid";
import RelatedGalleries from "@/components/gallery/RelatedGalleries";
import {
  getPublishedGalleries,
  getGalleryBySlug,
  getRelatedGalleries,
} from "@/data/galleries";
import { getGalleryImages } from "@/lib/cloudinary/getGalleryImages";
import { buildMetadata, buildGalleryOgImageUrl } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedGalleries().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery) return {};

  return buildMetadata({
    title: gallery.seoTitle ?? gallery.title,
    description: gallery.seoDescription ?? gallery.description,
    path: `/gallery/${gallery.slug}`,
    ogImage: buildGalleryOgImageUrl(gallery.coverImage),
  });
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);

  if (!gallery || !gallery.published) notFound();

  const [images, related] = await Promise.all([
    getGalleryImages(gallery.cloudinaryFolder),
    Promise.resolve(getRelatedGalleries(gallery)),
  ]);

  return (
    <article>
      <GalleryHero gallery={gallery} />

      <div className={styles.body}>
        <Container>
          <div className={styles.meta}>
            <GalleryMeta gallery={gallery} />
          </div>
        </Container>

        <div className={styles.imageGrid}>
          <ImageGrid images={images} />
        </div>

        <Container>
          <RelatedGalleries galleries={related} />
        </Container>
      </div>
    </article>
  );
}
