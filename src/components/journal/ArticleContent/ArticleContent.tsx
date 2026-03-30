import styles from "./ArticleContent.module.scss";

interface ArticleContentProps {
  content: React.ReactNode;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return <div className={styles.article}>{content}</div>;
}
