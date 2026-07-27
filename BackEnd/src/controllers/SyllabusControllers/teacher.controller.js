import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Syllabus from "../../models/syllabus.model.js";
import Class from "../../models/class.model.js";

// get teacher  all syllabus by  year 
export const getAllSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { year } = req.query;
  const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

  if (!year) {
    return next(new apiError("Year query parameter is required", 400));
  }

  const syllabusList = await Syllabus.find({ teacherId, year })
    .populate("classId", "name") // Populate class name
    .populate("subjectId", "name") // Populate subject name
    .populate("madeBy", "name"); // Populate creator's name

  if (!syllabusList || syllabusList.length === 0) {
    return next(new apiError("No syllabus found for the specified year", 404));
  }

  res.status(200).json(apiResponse(true, "Syllabus retrieved successfully", syllabusList));
} catch (error) {
    next(new apiError(error.message, 500));
  }
});

// add a new syllabus by teacher
export const addSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { classId, subjectId, attachment } = req.body;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Validate required fields
    if (!classId || !subjectId || !attachment) {
      return next(new apiError("Class ID, Subject ID, and Attachment are required", 400));
    }

    // Create a new syllabus document
    const newSyllabus = new Syllabus({
      classId,
      subjectId,
      teacherId,
      madeBy: teacherId,
      madeByModel: "Teacher",
      attachment,
    });

    await newSyllabus.save();

    res.status(201).json(apiResponse(true, "Syllabus added successfully", newSyllabus));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// delete a syllabus by teacher
export const deleteSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Find the syllabus to ensure it belongs to the teacher
    const syllabusToDelete = await Syllabus.findOne({ _id: syllabusId, teacherId });

    if (!syllabusToDelete) {
      return next(new apiError("Syllabus not found or you do not have permission to delete it", 404));
    }

    await Syllabus.deleteOne({ _id: syllabusId });

    res.status(200).json(apiResponse(true, "Syllabus deleted successfully"));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});


// update a syllabus by teacher
export const updateSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const { classId, subjectId, attachment } = req.body;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Find the syllabus to ensure it belongs to the teacher
    const syllabusToUpdate = await Syllabus.findOne({ _id: syllabusId, teacherId });

    if (!syllabusToUpdate) {
      return next(new apiError("Syllabus not found or you do not have permission to update it", 404));
    }

    // Update fields if provided
    if (classId) syllabusToUpdate.classId = classId;
    if (subjectId) syllabusToUpdate.subjectId = subjectId;
    if (attachment) syllabusToUpdate.attachment = attachment;

    await syllabusToUpdate.save();

    res.status(200).json(apiResponse(true, "Syllabus updated successfully", syllabusToUpdate));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});


// get all sullabus  for  approved or not approved by teacher
export const getAllSyllabusByApprovalStatus = asyncHandler(async (req, res) => {
  try {
    const { isApproved } = req.query;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Validate isApproved query parameter
    if (isApproved !== "true" && isApproved !== "false") {
      return next(new apiError("isApproved query parameter must be 'true' or 'false'", 400));
    }

    const approvalStatus = isApproved === "true";

    const syllabusList = await Syllabus.find({ teacherId, isApproved: approvalStatus })
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("madeBy", "name"); // Populate creator's name

    if (!syllabusList || syllabusList.length === 0) {
      return next(new apiError("No syllabus found for the specified approval status", 404));
    }

    res.status(200).json(apiResponse(true, "Syllabus retrieved successfully", syllabusList));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// approve  the syllabus by teacher
export const approveSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Find the syllabus to ensure it belongs to the teacher
    const syllabusToApprove = await Syllabus.findOne({ _id: syllabusId, teacherId });

    if (!syllabusToApprove) {
      return next(new apiError("Syllabus not found or you do not have permission to approve it", 404));
    }

    // Update the approval status
    syllabusToApprove.isApproved = true;
    await syllabusToApprove.save();

    res.status(200).json(apiResponse(true, "Syllabus approved successfully", syllabusToApprove));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// reject  the syllabus by teacher
export const rejectSyllabusByTeacher = asyncHandler(async (req, res) => {
  try {
    const { syllabusId } = req.params;
    const { reactionReason } = req.body; // Reason for rejection
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    // Validate reactionReason
    if (!reactionReason || reactionReason.trim() === "") {
      return next(new apiError("Reaction reason is required for rejection", 400));
    }

    // Find the syllabus to ensure it belongs to the teacher
    const syllabusToReject = await Syllabus.findOne({ _id: syllabusId, teacherId });

    if (!syllabusToReject) {
      return next(new apiError("Syllabus not found or you do not have permission to reject it", 404));
    }

    // Update the approval status and add the reaction reason
    syllabusToReject.isApproved = false;
    syllabusToReject.ReactionReason = reactionReason;
    await syllabusToReject.save();

    res.status(200).json(apiResponse(true, "Syllabus rejected successfully", syllabusToReject));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});


