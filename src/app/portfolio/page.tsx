import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getPublishedGalleries } from "@/data/galleries";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Concert, editorial, and event photography by Thomas Woroniak. Browse the full gallery archive.",
  path: "/portfolio",
});

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
