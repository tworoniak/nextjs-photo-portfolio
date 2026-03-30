import cloudinary from "./cloudinary";
import type { GalleryImage } from "@/types/image";

export async function getGalleryImages(folder: string): Promise<GalleryImage[]> {
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .with_field("context")
    .sort_by("public_id", "asc")
    .max_results(100)
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

// Minimal type for Cloudinary search response resources
type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  context?: {
    alt?: string;
    caption?: string;
  };
};
