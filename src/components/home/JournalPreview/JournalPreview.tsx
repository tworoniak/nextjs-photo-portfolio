import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import JournalCard from "@/components/journal/JournalCard";
import type { JournalPost } from "@/types/journal";
import styles from "./JournalPreview.module.scss";

interface JournalPreviewProps {
  posts: JournalPost[];
}

export default function JournalPreview({ posts }: JournalPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionHeading eyebrow="Writing" title="From the Journal" />
        <Link href="/journal" className={styles.viewAll}>
          All posts &rarr;
        </Link>
      </div>
      <ul className={styles.grid}>
        {posts.map((post) => (
          <li key={post.slug}>
            <JournalCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
