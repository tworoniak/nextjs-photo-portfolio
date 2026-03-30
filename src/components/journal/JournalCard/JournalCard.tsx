"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import type { JournalPost } from "@/types/journal";
import { formatDate } from "@/lib/utils/formatDate";
import Badge from "@/components/ui/Badge";
import styles from "./JournalCard.module.scss";

interface JournalCardProps {
  post: JournalPost;
}

export default function JournalCard({ post }: JournalCardProps) {
  return (
    <Link href={`/journal/${post.slug}`} className={styles.card}>
      {post.coverImage && (
        <div className={styles.imageWrapper}>
          <CldImage
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            crop="fill"
            gravity="auto"
          />
        </div>
      )}

      <div className={styles.body}>
        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        )}
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <time className={styles.date} dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
      </div>
    </Link>
  );
}
