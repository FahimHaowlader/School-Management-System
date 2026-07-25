import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


//model
import Support from "../../models/support.model.js";


// get all supports for students
export const getAllStudentSupports = asyncHandler(async (req, res) => {
  try {
    const accountType = req.user?.accountType;
    if (accountType !== "student") {
      throw new apiError(403, "Access denied. Only students can access this resource.");
    }
    const supports = await Support.find({ userType: "student",isApproved: true })
    return res.status(200).json(new apiResponse(200, supports, "Student supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get all supports for guardians
export const getAllGuardianSupports = asyncHandler(async (req, res) => {
  try {
    const accountType = req.user?.accountType;
    if (accountType !== "guardian") {
      throw new apiError(403, "Access denied. Only guardians can access this resource.");
    }
    const supports = await Support.find({ userType: "guardian",isApproved: true });
    return res.status(200).json(new apiResponse(200, supports, "Guardian supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get all supports for staff
export const getAllStaffSupports = asyncHandler(async (req, res) => {
  try {
    const accountType = req.user?.accountType;
    if (accountType !== "staff") {
      throw new apiError(403, "Access denied. Only staff can access this resource.");
    }
    const supports = await Support.find({ userType: "staff",isApproved: true })
    return res.status(200).json(new apiResponse(200, supports, "Staff supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get all supports for teachers
export const getAllTeacherSupports = asyncHandler(async (req, res) => {
  try {
    const accountType = req.user?.accountType;
    if (accountType !== "teacher") {
      throw new apiError(403, "Access denied. Only teachers can access this resource.");
    }
    const supports = await Support.find({ userType: "teacher" ,isApproved: true })
    return res.status(200).json(new apiResponse(200, supports, "Teacher supports fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

   