import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


//model
import Support from "../../models/support.model.js";


// get all supports 
export const getAllSupports = asyncHandler(async (req, res) => {
  try {
    const supports = await Support.find({isApproved: true })
    return res.status(200).json(new apiResponse(200, supports, "Supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update the support by the technician
export const updateSupportByTechnician = asyncHandler(async (req, res) => {
  try {
    const supportId = req.params.supportId;
    const { isApproved, checkAfterReview, ReactionReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(supportId)) {
      throw new apiError(400, "Invalid support ID");
    }

    const support = await Support.findById(supportId);
    if (!support) {
      throw new apiError(404, "Support not found");
    }

    // Update the support fields
    support.isApproved = isApproved !== undefined ? isApproved : support.isApproved;
    support.checkAfterReview = checkAfterReview !== undefined ? checkAfterReview : support.checkAfterReview;
    support.ReactionReason = ReactionReason !== undefined ? ReactionReason : support.ReactionReason;

    await support.save();

    return res.status(200).json(new apiResponse(200, support, "Support updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// create a new support
export const createSupport = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      throw new apiError(400, "Title and description are required");
    }

    const newSupport = new Support({
      title,
      description,
      createdBy: req.user._id, // Assuming the user's ID is available in req.user
    });

    await newSupport.save();

    return res.status(201).json(new apiResponse(201, newSupport, "Support created successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update are pending support by the technician
export const updatePendingSupportByTechnician = asyncHandler(async (req, res) => {
  try {
    const supportId = req.params.supportId;
    const { isApproved, checkAfterReview, ReactionReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(supportId)) {
      throw new apiError(400, "Invalid support ID");
    }

    const support = await Support.findById(supportId);
    if (!support) {
      throw new apiError(404, "Support not found");
    }

    // Update the support fields
    support.isApproved = isApproved !== undefined ? isApproved : support.isApproved;
    support.checkAfterReview = checkAfterReview !== undefined ? checkAfterReview : support.checkAfterReview;
    support.ReactionReason = ReactionReason !== undefined ? ReactionReason : support.ReactionReason;

    await support.save();

    return res.status(200).json(new apiResponse(200, support, "Pending support updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get all approved supports for the technician
export const getApprovedSupportsForTechnician = asyncHandler(async (req, res) => {
  try {
    const supports = await Support.find({ isApproved: true });
    return res.status(200).json(new apiResponse(200, supports, "Approved supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get all rejected supports for the technician
export const getRejectedSupportsForTechnician = asyncHandler(async (req, res) => {
  try {
    const supports = await Support.find({ isApproved: false });
    return res.status(200).json(new apiResponse(200, supports, "Rejected supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


