import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileToCloudinary = async (file: string, folder: string) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      upload_preset: "graphixHunt",
      folder,
    });

    const fileCloudinaryData = {
      downloadLink: response.secure_url,
      public_id: response.public_id,
    };
    return fileCloudinaryData;
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};

export const deleteFileFromCloudinary = async (public_id: string) => {
  try {
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
