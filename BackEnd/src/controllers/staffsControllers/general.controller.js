import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Staff from "../../models/staff.model.js";



// get the count of the staff
export const getStaffCount = asyncHandler(async (req, res) => {
  const staffCount = await Staff.countDocuments();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count: staffCount },
        "Staff count fetched successfully"
      )
    );
});

// get all staff with pagination
export const getAllStaffs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch staff with pagination
    const staffs = await Staff.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    // Get the total count of staff for pagination info
    const totalStaffs = await Staff.countDocuments();

    if (!staffs || staffs.length === 0) {
      throw new apiError(404, "No staff found");
    }

    return res.status(200).json(
      new apiResponse(200, {
        staffs,
        totalStaffs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalStaffs / limit),
      }, "Staff fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// search staff by name or email
export const searchStaffs = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      throw new apiError(400, "Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find staff that match the search criteria in name or email
    const staffs = await Staff.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });

    if (!staffs || staffs.length === 0) {
      throw new apiError(404, "No staff found matching the search criteria");
    }

    return res
      .status(200)
      .json(new apiResponse(200, staffs, "Staff fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get staff by ID
export const getStaffById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Staff ID is required and must be a string");
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid staff ID format");
    }

    const staff = await Staff.findById(id);

    if (!staff) {
      throw new apiError(404, "Staff not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, staff, "Staff fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// add new staff
export const addNewStaff = asyncHandler(async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      throw new apiError(400, "Name, email, and role are required");
    }

    // Check if the staff with the same email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      throw new apiError(400, "Staff with this email already exists");
    }

    // Create a new staff member
    const newStaff = new Staff({ name, email, role });
    await newStaff.save();

    return res
      .status(201)
      .json(new apiResponse(201, newStaff, "Staff created successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// update staff by ID
export const updateStaffById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Staff ID is required and must be a string");
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid staff ID format");
    }

    // Find the staff by ID
    const staff = await Staff.findById(id);

    if (!staff) {
      throw new apiError(404, "Staff not found");
    }

    // Update the staff fields if provided
    if (name) staff.name = name;
    if (email) staff.email = email;
    if (role) staff.role = role;

    // Save the updated staff member
    await staff.save();

    return res
      .status(200)
      .json(new apiResponse(200, staff, "Staff updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// action on staff by ID (activate/deactivate)
export const actionOnStaffById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    // Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Staff ID is required and must be a string");
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid staff ID format");
    }

    // Find the staff by ID
    const staff = await Staff.findById(id);

    if (!staff) {
      throw new apiError(404, "Staff not found");
    }

    // Perform the action based on the provided action type
    if (action === "activate") {
      staff.active = true;
    } else if (action === "deactivate") {
      staff.active = false;
    } else {
      throw new apiError(400, "Invalid action. Use 'activate' or 'deactivate'");
    }

    // Save the updated staff member
    await staff.save();

    return res
      .status(200)
      .json(new apiResponse(200, staff, `Staff ${action}d successfully`));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all requests for staff approval
export const getAllStaffRequests = asyncHandler(async (req, res) => {
  try {
    const staffRequests = await Staff.find({ approved: false });

    if (!staffRequests || staffRequests.length === 0) {
      throw new apiError(404, "No staff requests found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, staffRequests, "Staff requests fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all reviewed requests for staff approval
export const getAllReviewedStaffRequests = asyncHandler(async (req, res) => {
  try {
    const reviewedStaffRequests = await Staff.find({ approved: true });

    if (!reviewedStaffRequests || reviewedStaffRequests.length === 0) {
      throw new apiError(404, "No reviewed staff requests found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, reviewedStaffRequests, "Reviewed staff requests fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// update the emergency contact of the staff by id
export const updateStaffEmergencyContact = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { emergencyContact } = req.body;

    // Validate ID existence and string type
    if (!id || typeof id !== "string") {
      throw new apiError(400, "Staff ID is required and must be a string");
    }

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid staff ID format");
    }

    // Find the staff by ID
    const staff = await Staff.findById(id);

    if (!staff) {
      throw new apiError(404, "Staff not found");
    }

    // Update the emergency contact if provided
    if (emergencyContact) staff.emergencyContact = emergencyContact;

    // Save the updated staff member
    await staff.save();

    return res
      .status(200)
      .json(new apiResponse(200, staff, "Staff emergency contact updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});