import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Syllabus from "../../models/syllabus.model.js";
import Class from "../../models/class.model.js"; 

// add a new syllabus
export const addSyllabus = asyncHandler(async (req, res,) => {
  try {
    const { classId, subjectId, teacherId, madeBy, madeByModel, attachment } = req.body;

  // Check if the class exists
  const existingClass = await Class.findById(classId);
  if (!existingClass) {
    return new apiError(400,"Class not found");
  }

  // Create a new syllabus document
  const newSyllabus = await Syllabus.create({
    classId,
    subjectId,
    teacherId,
    madeBy,
    madeByModel,
    attachment,
  });

  res.status(201).json(apiResponse(true, "Syllabus added successfully", newSyllabus));
}catch (error) {
    console.error("Error adding syllabus:", error);
    throw new apiError(500,"Failed to add syllabus",);
  } 
}); 

// update the syllabus by id
export const updateSyllabus = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const { classId, subjectId, teacherId, madeBy, madeByModel, attachment } = req.body;

    // Find the syllabus by ID
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return new apiError(404,"Syllabus not found");
    }

    // Update the syllabus fields
    syllabus.classId = classId || syllabus.classId;
    syllabus.subjectId = subjectId || syllabus.subjectId;
    syllabus.teacherId = teacherId || syllabus.teacherId;
    syllabus.madeBy = madeBy || syllabus.madeBy;
    syllabus.madeByModel = madeByModel || syllabus.madeByModel;
    syllabus.attachment = attachment || syllabus.attachment;

    // Save the updated syllabus
    await syllabus.save();

    res.status(200).json(apiResponse(true, "Syllabus updated successfully", syllabus));
  } catch (error) {
    console.error("Error updating syllabus:", error);
    throw new apiError(500,"Failed to update syllabus");
  }
});


// find all pending syllabus 
export const getPendingSyllabus = asyncHandler(async (req, res) => {
  try {
    const pendingSyllabus = await Syllabus.find({ isApproved: null }).populate("classId subjectId teacherId madeBy");
    res.status(200).json(apiResponse(true, "Pending syllabus retrieved successfully", pendingSyllabus));
  } catch (error) {
    console.error("Error retrieving pending syllabus:", error);
    throw new apiError(500, "Failed to retrieve pending syllabus");
  }
});


// get all aproved syllabus
export const getApprovedSyllabus = asyncHandler(async (req, res) => {
  try {
    const approvedSyllabus = await Syllabus.find({ isApproved: true }).populate("classId subjectId teacherId madeBy");
    res.status(200).json(apiResponse(true, "Approved syllabus retrieved successfully", approvedSyllabus));
  } catch (error) {
    console.error("Error retrieving approved syllabus:", error);
    throw new apiError(500, "Failed to retrieve approved syllabus");
  }
});

// get all rejected syllabus
export const getRejectedSyllabus = asyncHandler(async (req, res) => {
  try {
    const rejectedSyllabus = await Syllabus.find({ isApproved: false }).populate("classId subjectId teacherId madeBy");
    res.status(200).json(apiResponse(true, "Rejected syllabus retrieved successfully", rejectedSyllabus));
  } catch (error) {
    console.error("Error retrieving rejected syllabus:", error);
    throw new apiError(500, "Failed to retrieve rejected syllabus");
  }
});

// conformation after review syllabus
export const reviewSyllabus = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const { isApproved, checkAfterReview, ReactionReason } = req.body;

    // Validate the input
    if (typeof isApproved !== "boolean" || typeof checkAfterReview !== "boolean") {
      return new apiError(400, "isApproved and checkAfterReview must be boolean values");
    }

    // Find the syllabus by ID
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return new apiError(404, "Syllabus not found");
    }

    // Update the syllabus fields
    syllabus.isApproved = isApproved;
    syllabus.checkAfterReview = checkAfterReview;
    syllabus.ReactionReason = ReactionReason || null;

    // Save the updated syllabus
    await syllabus.save();

    res.status(200).json(apiResponse(true, "Syllabus reviewed successfully", syllabus));
  } catch (error) {
    console.error("Error reviewing syllabus:", error);
    throw new apiError(500, "Failed to review syllabus");
  }
});