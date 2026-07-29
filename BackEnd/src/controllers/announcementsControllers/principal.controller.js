import mongoose from "mongoose";


import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Announcement from "../../models/announcements/announcement.model.js";


// update the status of a specific announcement
export const updateAnnouncementStatus = asyncHandler(async (req, res) => {
  try {
    const { announcementId, newStatus } = req.body;

    if (!announcementId || !newStatus) {
      throw new apiError(400, "Both announcementId and newStatus are required");
    }

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
      throw new apiError(400, "Invalid announcementId");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      throw new apiError(404, "Announcement not found");
    }

    // Update the announcement status
    announcement.status = newStatus;
    await announcement.save();

    return res.status(200).json(new apiResponse(200, announcement, "Announcement status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new announcement
export const addAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { title, content, status } = req.body;

    if (!title || !content || !status) {
      throw new apiError(400, "Title, content, and status are required");
    }

    // Create a new announcement
    const newAnnouncement = new Announcement({ title, content, status });
    await newAnnouncement.save();

    return res.status(201).json(new apiResponse(201, newAnnouncement, "New announcement added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update an existing announcement
export const updateAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { announcementId, title, content, status } = req.body;

    if (!announcementId || !title || !content || !status) {
      throw new apiError(400, "Announcement ID, title, content, and status are required");
    }

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
      throw new apiError(400, "Invalid announcementId");
    }

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      throw new apiError(404, "Announcement not found");
    }

    // Update the announcement details
    announcement.title = title;
    announcement.content = content;
    announcement.status = status;
    await announcement.save();

    return res.status(200).json(new apiResponse(200, announcement, "Announcement updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// delete an announcement
export const deleteAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { announcementId } = req.body;

    if (!announcementId) {
      throw new apiError(400, "Announcement ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(announcementId)) {
      throw new apiError(400, "Invalid announcementId");
    }

    const announcement = await Announcement.findByIdAndDelete(announcementId);
    if (!announcement) {
      throw new apiError(404, "Announcement not found");
    }

    return res.status(200).json(new apiResponse(200, null, "Announcement deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});