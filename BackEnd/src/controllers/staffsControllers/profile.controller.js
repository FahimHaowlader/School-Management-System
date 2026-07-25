import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";
import deleteLocalFiles from "../../utils/deleteLocalFiles.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";

//models
import Staff from "../../models/staff.model.js";


// get staff profile
export const getStaffProfile = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Find the staff by ID
    const staff = await Staff.findById(staff_id).select("-password -__v"); // Omit sensitive fields

    if (!staff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, staff, "Staff profile fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff personal information
export const updateStaffPersonalInformation = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's personal information
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { firstName, lastName, email, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff personal information updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff contact information
export const updateStaffContactInformation = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;
    const { address, city, state, postalCode, country } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's contact information
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { address, city, state, postalCode, country },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff contact information updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff profile picture
export const updateStaffProfilePicture = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Check if a file was uploaded
    if (!req.files || !req.files.profilePicture) {
      throw new apiError(400, "Profile picture file is required");
    }

    const profilePictureFile = req.files.profilePicture;

    // Upload the new profile picture to Cloudinary
    const uploadResult = await uploadToCloudinary(profilePictureFile.tempFilePath, "staff_profile_pictures");

    // Update the staff's profile picture URL in the database
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { profilePicture: uploadResult.secure_url },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff profile picture updated successfully"
      )
    );
  } catch (error) {
    await deleteLocalFiles([req.files]); // Clean up uploaded file in case of error
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff about me section 

export const updateStaffAboutMe = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;
    const { aboutMe } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's about me section
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { aboutMe },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff about me section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff educatinal qualification   section
export const updateStaffEducationalQualification = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;
    const { educationalQualification } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's educational qualification section
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { educationalQualification },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff educational qualification section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
}); 

// update staff work experience   section
export const updateStaffWorkExperience = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user?._id;
    const { workExperience } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's work experience section
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { workExperience },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff work experience section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update staff achievements   section
export const updateStaffAchievements = asyncHandler(async (req, res) => {
    try {
    const staff_id = req.user?._id;
    const { achievements } = req.body;

    // Validate staff ID
    if (!staff_id) {
      throw new apiError(400, "Staff ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(staff_id)) {
      throw new apiError(400, "Invalid Staff ID");
    }

    // Update the staff's achievements section
    const updatedStaff = await Staff.findByIdAndUpdate(
      staff_id,
      { achievements },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedStaff) {
      throw new apiError(404, "Staff profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedStaff,
        "Staff achievements section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


