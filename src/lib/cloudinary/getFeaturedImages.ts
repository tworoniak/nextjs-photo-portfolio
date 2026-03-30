import cloudinary from "./cloudinary";
import type { GalleryImage } from "@/types/image";

export async function getFeaturedImages(limit = 12): Promise<GalleryImage[]> {
  const result = await cloudinary.search
    .expression("tags=featured")
    .with_field("context")
    .sort_by("created_at", "desc")
    .max_results(limit)
    .execute();

  return result.resources.map(
    (resource: CloudinaryResource): GalleryImage => ({
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      alt: resource.context?.alt ?? "",
      caption: resource.context?.caption,
      blurDataUrl: undefined,
    })
  );
}

type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  context?: {
    alt?: string;
    caption?: string;
  };
};
