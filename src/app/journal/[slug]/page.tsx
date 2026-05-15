import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Container from "@/components/ui/Container";
import ArticleContent from "@/components/journal/ArticleContent";
import Badge from "@/components/ui/Badge";
import { getAllJournalPosts, getJournalPostBySlug, getRawPostContent } from "@/lib/mdx/journal";
import { buildMetadata, buildGalleryOgImageUrl } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/formatDate";
import styles from "./page.module.scss";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJournalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/journal/${post.slug}`,
    ogImage: post.coverImage ? buildGalleryOgImageUrl(post.coverImage) : undefined,
  });
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  if (!post) notFound();

  const rawContent = getRawPostContent(slug);
  if (!rawContent) notFound();

  const { content } = await compileMDX({
    source: rawContent,
    components: {}, // extend with custom MDX components as journal content grows
  });

  return (
    <article className={styles.page}>
      <Container medium>
        <header className={styles.header}>
          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <Badge key={tag} label={tag} />
              ))}
            </div>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <time className={styles.date} dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </header>

        <div className={styles.divider} />

        <ArticleContent content={content} />
      </Container>
    </article>
  );
}
