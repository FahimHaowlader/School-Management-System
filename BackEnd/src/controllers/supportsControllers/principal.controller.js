import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


//model
import Support from "../../models/support.model.js";

// update the status of a specific support
export const updateSupportStatus = asyncHandler(async (req, res) => {
  try {
    const { supportId, newStatus } = req.body;

    if (!supportId || !newStatus) {
      throw new apiError(400, "Both supportId and newStatus are required");
    }

    if (!mongoose.Types.ObjectId.isValid(supportId)) {
      throw new apiError(400, "Invalid supportId");
    }

    const support = await Support.findById(supportId);
    if (!support) {
      throw new apiError(404, "Support not found");
    }

    // Update the support status
    support.status = newStatus;
    await support.save();

    return res.status(200).json(new apiResponse(200, support, "Support status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new support
export const addSupport = asyncHandler(async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      throw new apiError(400, "Title, description, and status are required");
    }

    // Create a new support
    const newSupport = new Support({ title, description, status });
    await newSupport.save();

    return res.status(201).json(new apiResponse(201, newSupport, "New support added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update an existing support
export const updateSupport = asyncHandler(async (req, res) => {
  try {
    const { supportId, title, description, status } = req.body;

    if (!supportId || !title || !description || !status) {
      throw new apiError(400, "supportId, title, description, and status are required");
    }

    if (!mongoose.Types.ObjectId.isValid(supportId)) {
      throw new apiError(400, "Invalid supportId");
    }

    const support = await Support.findById(supportId);
    if (!support) {
      throw new apiError(404, "Support not found");
    }

    // Update the support fields
    support.title = title;
    support.description = description;
    support.status = status;

    await support.save();

    return res.status(200).json(new apiResponse(200, support, "Support updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// delete a specific support
export const deleteSupport = asyncHandler(async (req, res) => {
  try {
    const { supportId } = req.body;

    if (!supportId) {
      throw new apiError(400, "supportId is required");
    }

    if (!mongoose.Types.ObjectId.isValid(supportId)) {
      throw new apiError(400, "Invalid supportId");
    }

    const support = await Support.findById(supportId);
    if (!support) {
      throw new apiError(404, "Support not found");
    }

    await Support.findByIdAndDelete(supportId);

    return res.status(200).json(new apiResponse(200, null, "Support deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

