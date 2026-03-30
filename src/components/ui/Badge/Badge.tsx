import styles from "./Badge.module.scss";
import clsx from "clsx";

interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className }: BadgeProps) {
  return <span className={clsx(styles.badge, className)}>{label}</span>;
}
