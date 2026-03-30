import type { JournalPost } from "@/types/journal";
import JournalCard from "@/components/journal/JournalCard";
import styles from "./JournalGrid.module.scss";

interface JournalGridProps {
  posts: JournalPost[];
}

export default function JournalGrid({ posts }: JournalGridProps) {
  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts yet — check back soon.</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <li key={post.slug}>
          <JournalCard post={post} />
        </li>
      ))}
    </ul>
  );
}
