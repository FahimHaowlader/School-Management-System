import mongoose from "mongoose";

import asyncHandler from "../../utils/asyncHandler";
import apiError from "../../utils/apiError";
import apiResponse from "../../utils/apiResponse";


import Announcement from "../../models/announcement.model" 


// create a new announcement by technician
export const createAnnouncementByTechnician = asyncHandler(async (req, res) => {
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
    createdBy: req.user._id, // Assuming req.user contains the authenticated technician's info
  });

  return res
    .status(201)
    .json(new apiResponse(201, announcement, "Announcement created successfully"));
} catch (error) {
  throw new apiError(500, error.message);
}
});


//search the announcement by technician
export const searchAnnouncementsByTechnician = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      throw new apiError(400, "Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find announcements that match the search criteria in title or content
    const announcements = await Announcement.find({
      createdBy: req.user._id,
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
    });

    if (!announcements || announcements.length === 0) {
      throw new apiError(404, "No announcements found matching the search criteria");
    }

    return res
      .status(200)
      .json(new apiResponse(200, announcements, "Announcements retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all pending announcements for a specific technician

export const getPendingAnnouncementsForTechnician = asyncHandler(async (req, res) => {
  try {
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find announcements that are pending and created by the specific technician
    const pendingAnnouncements = await Announcement.find({
      status: "pending",
      createdBy: technicianId,
    });

    if (!pendingAnnouncements || pendingAnnouncements.length === 0) {
      throw new apiError(404, "No pending announcements found for this technician");
    }

    return res
      .status(200)
      .json(new apiResponse(200, pendingAnnouncements, "Pending announcements retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all reviewed announcements for a specific technician
export const getReviewedAnnouncementsForTechnician = asyncHandler(async (req, res) => {
  try {
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find announcements that are reviewed and created by the specific technician
    const reviewedAnnouncements = await Announcement.find({
      status: "reviewed",
      createdBy: technicianId,
    });

    if (!reviewedAnnouncements || reviewedAnnouncements.length === 0) {
      throw new apiError(404, "No reviewed announcements found for this technician");
    }

    return res
      .status(200)
      .json(new apiResponse(200, reviewedAnnouncements, "Reviewed announcements retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

