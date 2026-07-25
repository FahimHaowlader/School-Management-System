import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";
import uploadToCloudinary from "../../utils/Cloudinary.js";
import deleteLocalFiles from "../../utils/deleteLocalFiles.js";






export const uploadPdfToCloudinary = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      throw new apiError(400, "No file uploaded");
    }

    const filePath = req.file.path;
    // check if the file is a PDF
    if (req.file.mimetype !== "application/pdf") {
      deleteLocalFiles([filePath]);
      throw new apiError(400, "Only PDF files are allowed");
    }

    const fileSizeInMB = req.file.size / (1024 * 1024);
    if (fileSizeInMB > 10) {
      deleteLocalFiles([filePath]);
      throw new apiError(400, "File size exceeds the 10MB limit");
    }

    const result = await uploadToCloudinary(filePath, "pdfs");

    // Delete the local file after uploading to Cloudinary
    deleteLocalFiles([filePath]);

    return res.status(200).json(
      new apiResponse(
        200,
        "File uploaded successfully",
        { url: result.secure_url },
        null
      )
    );
  } catch (error) {
    deleteLocalFiles([req.file.path]);
    throw new apiError(500, error.message || "Internal Server Error");
  }
});






