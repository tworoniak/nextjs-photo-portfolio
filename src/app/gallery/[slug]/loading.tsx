import styles from "./loading.module.scss";

export default function GalleryLoading() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.heroSkeleton} />

      <div className={styles.metaSkeleton}>
        <div className={styles.metaLine} />
        <div className={styles.metaLineShort} />
      </div>

      <div className={styles.gridSkeleton}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.imageSkeleton} />
        ))}
      </div>
    </div>
  );
}
