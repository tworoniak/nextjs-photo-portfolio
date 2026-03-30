import type { Gallery } from "@/types/gallery";
import { formatDate } from "@/lib/utils/formatDate";
import Badge from "@/components/ui/Badge";
import styles from "./GalleryMeta.module.scss";

interface GalleryMetaProps {
  gallery: Gallery;
}

export default function GalleryMeta({ gallery }: GalleryMetaProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <p>{gallery.description}</p>
      </div>

      <dl className={styles.details}>
        <div className={styles.item}>
          <dt>Date</dt>
          <dd>{formatDate(gallery.date)}</dd>
        </div>
        <div className={styles.item}>
          <dt>Location</dt>
          <dd>{gallery.city}</dd>
        </div>
        {gallery.venue && (
          <div className={styles.item}>
            <dt>Venue</dt>
            <dd>{gallery.venue}</dd>
          </div>
        )}
        {gallery.client && (
          <div className={styles.item}>
            <dt>Client</dt>
            <dd>{gallery.client}</dd>
          </div>
        )}
      </dl>

      {gallery.tags.length > 0 && (
        <div className={styles.tags}>
          {gallery.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
