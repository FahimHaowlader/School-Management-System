import mongoose from "mongoose";

import asyncHandler from "../../utils/asyncHandler";
import apiError from "../../utils/apiError";
import apiResponse from "../../utils/apiResponse";


import Announcement from "../../models/announcement.model"


// create a new announcement by teacher 
export const createAnnouncementByTeacher = asyncHandler(async (req, res) => {
    try {
  const { title, content, audience, category } = req.body;

  // 1. Basic validation
  if (!title || !content || !audience || !category) {
    throw new apiError(400, "All fields are required");
  }

  // 2. Normalize title to lowercase (matching schema behavior)
  const normalizedTitle = title.toLowerCase().trim();

  // 3. Create the document safely
  const announcement = await Announcement.create({
    title: normalizedTitle,
    content,
    audience,
    category,
    createdBy: req.user._id, // Assuming req.user contains the authenticated teacher's info
  });

  return res
    .status(201)
    .json(new apiResponse(201, announcement, "Announcement created successfully"));
} catch (error) {
  throw new apiError(500, error.message);
}
});


// update the announcement by teacher
export const updateAnnouncementByTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, audience, category } = req.body;

    // 1. Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Announcement ID is required and must be a string");
    }

    // 2. Validate MongoDB ObjectId format using mongoose.Types.ObjectId.isValid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid announcement ID format");
    }

    // 3. Find the announcement by ID
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      throw new apiError(404, "Announcement not found");
    }

    // 4. Check if the authenticated teacher is the creator of the announcement
    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      throw new apiError(403, "You do not have permission to update this announcement");
    }

    // 5. Update the announcement fieldsq 
    if (title) announcement.title = title.toLowerCase().trim();
    if (content) announcement.content = content;
    if (audience) announcement.audience = audience;
    if (category) announcement.category = category;

    // 6. Save the updated announcement
    await announcement.save();

    return res
      .status(200)
      .json(new apiResponse(200, announcement, "Announcement updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// delete the announcement by teacher
export const deleteAnnouncementByTeacher = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Announcement ID is required and must be a string");
    }

    // 2. Validate MongoDB ObjectId format using mongoose.Types.ObjectId.isValid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid announcement ID format");
    }

    // 3. Find the announcement by ID
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      throw new apiError(404, "Announcement not found");
    }

    // 4. Check if the authenticated teacher is the creator of the announcement
    if (announcement.createdBy.toString() !== req.user._id.toString()) {
      throw new apiError(403, "You do not have permission to delete this announcement");
    }

    // 5. Delete the announcement
    await Announcement.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new apiResponse(200, null, "Announcement deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// view all announcements created by the teacher
export const getAllAnnouncementsByTeacher = asyncHandler(async (req, res) => {
  try {
    const announcements = await Announcement.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!announcements || announcements.length === 0) {
      throw new apiError(404, "No announcements found for this teacher");
    }

    return res
      .status(200)
      .json(new apiResponse(200, announcements, "Announcements fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// view the revivewed announcements by the teacher
export const getReviewedAnnouncementsByTeacher = asyncHandler(async (req, res) => {
  try {
    const announcements = await Announcement.find({
      createdBy: req.user._id,
      status: { $in: ["approved", "rejected"] },
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!announcements || announcements.length === 0) {
      throw new apiError(404, "No reviewed announcements found for this teacher");
    }

    return res
      .status(200)
      .json(new apiResponse(200, announcements, "Reviewed announcements fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});



