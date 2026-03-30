import { HTMLAttributes } from "react";
import styles from "./Container.module.scss";
import clsx from "clsx";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
  medium?: boolean;
}

export default function Container({
  narrow,
  medium,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        styles.container,
        narrow && styles.narrow,
        medium && styles.medium,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
