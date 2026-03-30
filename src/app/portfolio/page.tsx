import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getPublishedGalleries } from "@/data/galleries";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Concert, editorial, and event photography. Browse the full gallery archive.",
};

export default function PortfolioPage() {
  const galleries = getPublishedGalleries();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Work"
            title="Portfolio"
            description="Concert, editorial, and event photography."
          />
        </div>
        <GalleryGrid galleries={galleries} />
      </Container>
    </div>
  );
}
