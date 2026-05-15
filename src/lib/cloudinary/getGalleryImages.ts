import cloudinary from "./cloudinary";
import type { GalleryImage } from "@/types/image";

export async function getGalleryImages(folder: string): Promise<GalleryImage[]> {
  const result = await cloudinary.search
    .expression(`folder:${folder}`)
    .with_field("context")
    .sort_by("public_id", "asc")
    .max_results(500) // raise limit; implement cursor pagination in Phase 2
    .execute();

  return result.resources.map(
    (resource: CloudinaryResource): GalleryImage => ({
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      alt: resource.context?.alt ?? resource.public_id.split("/").pop() ?? "",
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
