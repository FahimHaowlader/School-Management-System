import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";
import deleteLocalFiles from "../../utils/deleteLocalFiles.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
// Model Import
import Student from "../../models/student.model.js";
import Guardian from "../../models/guardian.model.js";




// get guardian profile
export const getGuardianProfile = asyncHandler(async (req, res) => {
  try { 
    const guardian_id = req.user?._id;

  // Validate guardian ID
  if (!guardian_id) {
    throw new apiError(400, "Guardian ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(guardian_id)) {
    throw new apiError(400, "Invalid Guardian ID");
  }

  // Find the guardian by ID and populate the students field
  const guardian = await Guardian.findById(guardian_id)
    .populate({
      path: "students",
      select: "-password -__v", // Omit sensitive fields
    })
    .select("-password -__v"); // Omit sensitive fields from guardian as well

  if (!guardian) {
    throw new apiError(404, "Guardian profile not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, guardian, "Guardian profile fetched successfully"));
} catch (error) {
  throw new apiError(500, error.message || "Internal Server Error");
}
});



// update guardian  personal Information
export const updateGuardianPersonalInformation = asyncHandler(async (req, res) => {
 try {  
    const guardian_id = req.user?._id;
  const { firstName, lastName, email, phoneNumber } = req.body;

  // Validate guardian ID
  if (!guardian_id) {
    throw new apiError(400, "Guardian ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(guardian_id)) {
    throw new apiError(400, "Invalid Guardian ID");
  }

  // Find the guardian by ID
  const guardian = await Guardian.findById(guardian_id);

  if (!guardian) {
    throw new apiError(404, "Guardian profile not found");
  }

  // Update the fields if they are provided in the request body
  if (firstName) guardian.firstName = firstName;
  if (lastName) guardian.lastName = lastName;
  if (email) guardian.email = email;
  if (phoneNumber) guardian.phoneNumber = phoneNumber;

  // Save the updated guardian profile
  await guardian.save();

  return res.status(200).json(
    new apiResponse(
      200,
      guardian,
      "Guardian personal information updated successfully"
    )
  );
} catch (error) {
  throw new apiError(500, error.message || "Internal Server Error");
}
});

// update guardian contact Information
export const updateGuardianContactInformation = asyncHandler(async (req, res) => {
  try {
   const guardian_id = req.user?._id;
  const { address, city, state, postalCode, country } = req.body;

  // Validate guardian ID
  if (!guardian_id) {
    throw new apiError(400, "Guardian ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(guardian_id)) {
    throw new apiError(400, "Invalid Guardian ID");
  }

  // Find the guardian by ID
  const guardian = await Guardian.findById(guardian_id);

  if (!guardian) {
    throw new apiError(404, "Guardian profile not found");
  }

  // Update the contact information fields if they are provided in the request body
  if (address) guardian.address = address;
  if (city) guardian.city = city;
  if (state) guardian.state = state;
  if (postalCode) guardian.postalCode = postalCode;
  if (country) guardian.country = country;

  // Save the updated guardian profile
  await guardian.save();

  return res.status(200).json(
    new apiResponse(
      200,
      guardian,
      "Guardian contact information updated successfully"
    )
  );
} catch (error) {
  throw new apiError(500, error.message || "Internal Server Error");
}
});
// update guardian profile picture
export const updateGuardianProfilePicture = asyncHandler(async (req, res) => {
  try {
    const guardian_id = req.user?._id;

  // Validate guardian ID
  if (!guardian_id) {
    throw new apiError(400, "Guardian ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(guardian_id)) {
    throw new apiError(400, "Invalid Guardian ID");
  }

  // Find the guardian by ID
  const guardian = await Guardian.findById(guardian_id);

  if (!guardian) {
    throw new apiError(404, "Guardian profile not found");
  }

  // Validate uploaded file
  const pictureLocalPath = req?.files?.picture?.[0]?.path;
  if (
    !pictureLocalPath ||
    !/^.*\.(png|jpg|jpeg|webp)$/i.test(pictureLocalPath)
  ) {
    await deleteLocalFiles([req.files]); // Clean up uploaded file if validation fails
    throw new apiError(
      400,
      "Profile picture is required and must be PNG, JPG, JPEG, or WEBP"
    );
  }

  // Upload to Cloudinary
  const uploadResult = await uploadToCloudinary(pictureLocalPath);
  await deleteLocalFiles([req.files]); // Clean up uploaded file after upload
  if (!uploadResult?.secure_url) {
    throw new apiError(500, "Failed to upload profile picture");
  }

  // Delete old profile picture from Cloudinary if it exists
  if (guardian.profilePicture?.public_id) {
    await deleteFromCloudinary(guardian.profilePicture.public_id);
  }

  // Update the guardian's profile picture
  guardian.profilePicture = {
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };

  // Save the updated guardian profile
  await guardian.save();

  return res.status(200).json(
    new apiResponse(
      200,
      guardian,
      "Guardian profile picture updated successfully"
    )
  );
} catch (error) {
  await deleteLocalFiles([req.files]); // Clean up uploaded file in case of error
  throw new apiError(500, error.message || "Internal Server Error");
}
});


