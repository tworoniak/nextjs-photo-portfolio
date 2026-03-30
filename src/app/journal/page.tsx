import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JournalGrid from "@/components/journal/JournalGrid";
import { getAllJournalPosts } from "@/lib/mdx/journal";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Behind the scenes, technique, gear, and show recaps from the road.",
  path: "/journal",
});

export default function JournalPage() {
  const posts = getAllJournalPosts();

  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Writing"
            title="Journal"
            description="Behind the scenes, technique, gear, and show recaps."
          />
        </div>
        <JournalGrid posts={posts} />
      </Container>
    </div>
  );
}
