import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";
import deleteLocalFiles from "../../utils/deleteLocalFiles.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";

// Model Import
import Teacher from "../../models/teacher.model.js";


// get teacher profile
export const getTeacherProfile = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacher_id).select("-password -__v"); // Omit sensitive fields

    if (!teacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, teacher, "Teacher profile fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher personal information
export const updateTeacherPersonalInformation = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's personal information
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { firstName, lastName, email, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher personal information updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher contact information
export const updateTeacherContactInformation = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { address, city, state, zipCode } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's contact information
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { address, city, state, zipCode },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher contact information updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher profile picture
export const updateTeacherProfilePicture = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Check if a file was uploaded
    if (!req.files || !req.files.profilePicture) {
      throw new apiError(400, "Profile picture file is required");
    }

    const profilePictureFile = req.files.profilePicture;

    // Upload the new profile picture to Cloudinary
    const uploadResult = await uploadToCloudinary(profilePictureFile.tempFilePath, "teachers");

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacher_id);

    if (!teacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    // If the teacher already has a profile picture, delete the old one from Cloudinary
    if (teacher.profilePicture && teacher.profilePicture.public_id) {
      await deleteFromCloudinary(teacher.profilePicture.public_id);
    }

    // Update the teacher's profile picture with the new one
    teacher.profilePicture = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };

    await teacher.save();

    return res.status(200).json(
      new apiResponse(
        200,
        teacher,
        "Teacher profile picture updated successfully"
      )
    );
  } catch (error) {
    await deleteLocalFiles([req.files]); // Clean up uploaded file in case of error
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


// update about me section of teacher profile
export const updateTeacherAboutMe = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { aboutMe } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's about me section
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { aboutMe },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher about me section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher experience section of profile
export const updateTeacherExperience = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { experience } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's experience section
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { experience },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher experience section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


// update teacher education section of profile
export const updateTeacherEducationalQualifications = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { education } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's education section
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { education },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher education section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher achivement section of profile
export const updateTeacherAchievements = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { achievements } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's achievements section
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { achievements },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher achievements section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update teacher research-paper section of profile
export const updateTeacherResearchPapers = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user?._id;
    const { researchPapers } = req.body;

    // Validate teacher ID
    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacher_id)) {
      throw new apiError(400, "Invalid Teacher ID");
    }

    // Update the teacher's research papers section
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacher_id,
      { researchPapers },
      { new: true, runValidators: true }
    ).select("-password -__v"); // Omit sensitive fields

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher profile not found");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        updatedTeacher,
        "Teacher research papers section updated successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

