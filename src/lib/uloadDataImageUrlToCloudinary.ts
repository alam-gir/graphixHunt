import { v2 as cloudinary } from "cloudinary";

export const uploadImageDataURLToCloudinary = async (
  dataURL: string,
  folder: string
) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const response = await cloudinary.uploader.upload(dataURL, {
      upload_preset: "graphixHunt",
      folder,
    });

    const fileCloudinaryData = {
      downloadLink: response.secure_url,
      public_id: response.public_id,
    };
    return fileCloudinaryData;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
};
