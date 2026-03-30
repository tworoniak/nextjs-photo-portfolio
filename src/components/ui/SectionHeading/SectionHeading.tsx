import styles from "./SectionHeading.module.scss";
import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(styles.wrapper, centered && styles.centered, className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
