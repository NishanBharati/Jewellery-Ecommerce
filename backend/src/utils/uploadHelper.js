import { uploadToCloudinary } from "./uploadToCloudinary.js";
import { ApiError } from "./apiError.js";

/**
 * Handles multiple file uploads to Cloudinary
 * @param {Array} files - Array of file objects from multer (req.files)
 * @returns {Promise<Array>} Array of secure URLs from Cloudinary
 */
export const uploadMultipleFiles = async (files) => {
  try {
    // No files provided - just return empty array (images are optional)
    if (!files || !Array.isArray(files) || files.length === 0) {
      return [];
    }

    // Filter out empty/invalid files
    const validFiles = files.filter(file => {
      return file && 
             file.buffer && 
             file.buffer.length > 0 && 
             file.size > 0;
    });
    
    // If no valid files after filtering, return empty array
    if (validFiles.length === 0) {
      console.log("No valid files to upload, creating product without images");
      return [];
    }

    console.log(`Uploading ${validFiles.length} files to Cloudinary...`);
    const uploads = validFiles.map((file) => uploadToCloudinary(file.buffer));
    const results = await Promise.all(uploads);
    
    return results.map((img) => img.secure_url);
  } catch (error) {
    console.error("Upload error:", error);
    throw new ApiError(400, `File upload failed: ${error.message}`);
  }
};

/**
 * Handles single file upload to Cloudinary
 * @param {Object} file - File object from multer (req.file)
 * @returns {Promise<String>} Secure URL from Cloudinary
 */
export const uploadSingleFile = async (file) => {
  try {
    if (!file) {
      return null;
    }

    const result = await uploadToCloudinary(file.buffer);
    return result.secure_url;
  } catch (error) {
    throw new ApiError(400, `File upload failed: ${error.message}`);
  }
};
