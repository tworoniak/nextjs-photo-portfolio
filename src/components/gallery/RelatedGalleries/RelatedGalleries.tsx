import type { Gallery } from "@/types/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryCard from "@/components/gallery/GalleryCard";
import styles from "./RelatedGalleries.module.scss";

interface RelatedGalleriesProps {
  galleries: Gallery[];
}

export default function RelatedGalleries({ galleries }: RelatedGalleriesProps) {
  if (galleries.length === 0) return null;

  return (
    <section className={styles.section}>
      <SectionHeading eyebrow="More work" title="Related Galleries" />
      <ul className={styles.grid}>
        {galleries.map((gallery) => (
          <li key={gallery.slug}>
            <GalleryCard gallery={gallery} />
          </li>
        ))}
      </ul>
    </section>
  );
}
