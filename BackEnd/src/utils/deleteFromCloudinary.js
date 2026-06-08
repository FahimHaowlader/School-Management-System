import { v2 as cloudinary } from 'cloudinary';

/**
 * Extracts the public ID from a Cloudinary URL and deletes the asset in one function.
 * @param {string} fileUrl - The complete Cloudinary secure_url string.
 * @param {string} resourceType - 'image', 'video', or 'raw' (defaults to 'image').
 * @returns {Promise<object|null>} Cloudinary API response object, or null if no URL provided.
 */
export const deleteFromCloudinary = async (fileUrl, resourceType = 'image') => {
  try {
    if (!fileUrl) return null;

    // 1. Extract the Public ID from the URL string
    const parts = fileUrl.split('/');
    const fileNameWithExtension = parts.pop(); // Gets "filename.jpg"
    const publicIdWithoutExtension = fileNameWithExtension.split('.')[0]; // Gets "filename"
    
    let publicId = publicIdWithoutExtension;

    // Reconstruct folder path if the file is nested inside Cloudinary folders
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex !== -1 && parts.length > uploadIndex + 2) {
      const folderPath = parts.slice(uploadIndex + 2).join('/'); // Captures "folder/subfolder"
      publicId = `${folderPath}/${publicIdWithoutExtension}`;   // Yields "folder/subfolder/filename"
    }

    // 2. Delete the asset from Cloudinary using the parsed public ID
    const deletionResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType // Must match the asset type ('image', 'video', or 'raw' for PDFs/docs)
    });

    return deletionResult; // Returns Cloudinary response, e.g., { result: 'ok' }
  } catch (error) {
    console.error("Cloudinary Extraction & Deletion Failed:", error);
    throw error;
  }
};