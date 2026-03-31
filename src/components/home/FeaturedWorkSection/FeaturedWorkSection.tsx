import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import type { Gallery } from "@/types/gallery";
import styles from "./FeaturedWorkSection.module.scss";

interface FeaturedWorkSectionProps {
  galleries: Gallery[];
}

export default function FeaturedWorkSection({ galleries }: FeaturedWorkSectionProps) {
  if (galleries.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionHeading eyebrow="Selected work" title="Featured Galleries" />
        <Link href="/portfolio" className={styles.viewAll}>
          View all &rarr;
        </Link>
      </div>
      <GalleryGrid galleries={galleries} />
    </section>
  );
}
