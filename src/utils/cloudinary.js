import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.warn("No local file path provided for Cloudinary upload."); // Important warning
      return null;
    }
    console.log("Attempting Cloudinary upload:", localFilePath); // Log before upload
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    }); 
    console.log("Cloudinary response:", response);
    // file has been uploaded successfull
    // console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath); // Remove local file after successful upload
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error); // CRUCIAL: Log the full error object
    if (localFilePath) { // Only attempt to unlink if the path exists
        try {
            fs.unlinkSync(localFilePath);
            console.log("Successfully removed local file after failed upload")
        } catch (unlinkError) {
            console.error("Error removing local file:", unlinkError);
        }
    }
    return null;
  }
};

export { uploadOnCloudinary };
