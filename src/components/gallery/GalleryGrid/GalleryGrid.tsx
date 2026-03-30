import type { Gallery } from "@/types/gallery";
import GalleryCard from "@/components/gallery/GalleryCard";
import styles from "./GalleryGrid.module.scss";

interface GalleryGridProps {
  galleries: Gallery[];
}

export default function GalleryGrid({ galleries }: GalleryGridProps) {
  if (galleries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No galleries yet — check back soon.</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {galleries.map((gallery) => (
        <li key={gallery.slug}>
          <GalleryCard gallery={gallery} />
        </li>
      ))}
    </ul>
  );
}
