import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { JournalPost } from "@/types/journal";

const JOURNAL_DIR = path.join(process.cwd(), "src/content/journal");

function getFileSlugs(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function parsePost(slug: string): JournalPost | null {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    slug: data.slug ?? slug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage ?? "",
    publishedAt: data.publishedAt ?? "",
    tags: data.tags ?? [],
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
  };
}

export function getAllJournalPosts(): JournalPost[] {
  return getFileSlugs()
    .map(parsePost)
    .filter((post): post is JournalPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  const post = parsePost(slug);
  return post ?? undefined;
}

export function getRawPostContent(slug: string): string | null {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}
