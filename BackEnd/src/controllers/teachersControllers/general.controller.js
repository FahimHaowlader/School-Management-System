import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import Teacher from "../../models/teacher.model.js";
import Class from "../../models/class.model.js";
import Subject from "../../models/subject.model.js";
import Syllabus from "../../models/syllabus.model.js";


// get the count of the teacher
export const getTeacherCount = asyncHandler(async (req, res) => {
  const teacherCount = await Teacher.countDocuments();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count: teacherCount },
        "Teacher count fetched successfully"
      )
    );
});

// get all teachers with pagination
export const getAllTeachers = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch teachers with pagination
    const teachers = await Teacher.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    // Get the total count of teachers for pagination info
    const totalTeachers = await Teacher.countDocuments();

    if (!teachers || teachers.length === 0) {
      throw new apiError(404, "No teachers found");
    }

    return res.status(200).json(
      new apiResponse(200, {
        teachers,
        totalTeachers,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalTeachers / limit),
      }, "Teachers fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
}); 

// get the teacher by id
export const getTeacherById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid teacher ID");
    }

    const teacher = await Teacher.findById(id).lean();

    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, teacher, "Teacher fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all pending request to principal 
export const getPendingRequests = asyncHandler(async (req, res) => {
    try {
        const pendingRequests = await Teacher.find({ status: "pending" })
            .sort({ createdAt: -1 })
            .lean();

        if (!pendingRequests || pendingRequests.length === 0) {
            throw new apiError(404, "No pending requests found");
        }

        return res
            .status(200)
            .json(new apiResponse(200, pendingRequests, "Pending requests fetched successfully"));
    } catch (error) {
        throw new apiError(500, error.message);
    }
});


// search teachers by name or email
export const searchTeachers = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      throw new apiError(400, "Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find teachers that match the search criteria in name or email
    const teachers = await Teacher.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });

    if (!teachers || teachers.length === 0) {
      throw new apiError(404, "No teachers found matching the search criteria");
    }

    return res.status(200).json(
      new apiResponse(200, teachers, "Teachers fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all reviewed requests to principal
export const getReviewedRequests = asyncHandler(async (req, res) => {
  try {
    const reviewedRequests = await Teacher.find({ status: { $in: ["approved", "rejected"] } })
      .sort({ createdAt: -1 })
      .lean();

    if (!reviewedRequests || reviewedRequests.length === 0) {
      throw new apiError(404, "No reviewed requests found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, reviewedRequests, "Reviewed requests fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// update the teacher status by id
export const updateTeacherStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid teacher ID");
    }

    if (!status || !["approved", "rejected"].includes(status)) {
      throw new apiError(400, "Invalid status value. Must be 'approved' or 'rejected'");
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!updatedTeacher) {
      throw new apiError(404, "Teacher not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, updatedTeacher, "Teacher status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// take action on the teacher request by id
export const takeActionOnTeacherRequest = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid teacher ID");
    }

    if (!action || !["approve", "reject"].includes(action)) {
      throw new apiError(400, "Invalid action. Must be 'approve' or 'reject'");
    }

    const teacher = await Teacher.findById(id);
    
    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    // Update the teacher's status based on the action
    teacher.status = action === "approve" ? "approved" : "rejected";
    await teacher.save();

    return res
      .status(200)
      .json(new apiResponse(200, teacher, `Teacher request ${action}d successfully`));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// add a new teacher
export const addTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    throw new apiError(400, "Name, email, password, and role are required");
  }

  // Check if teacher/user already exists
  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    throw new apiError(409, "Teacher with this email already exists");
  }

  // Create new teacher
  const teacher = await Teacher.create({
    name,
    email: email.toLowerCase().trim(),
    password, // Handled by pre-save hook in your schema if using bcrypt
    role,
  });

  // Fetch created record excluding sensitive data like password
  const createdTeacher = await Teacher.findById(teacher._id).select(
    "-password"
  );

  if (!createdTeacher) {
    throw new apiError(500, "Something went wrong while registering the teacher");
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdTeacher, "Teacher registered successfully")
    );
});

// upadate the  emergency contact of the teacher
export const updateEmergencyContact = asyncHandler(async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { emergencyContact } = req.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      throw new apiError(400, "Invalid teacher ID");
    }

    if (!emergencyContact) {
      throw new apiError(400, "Emergency contact is required");
    }

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    teacher.emergencyContact = emergencyContact;
    await teacher.save();

    return res
      .status(200)
      .json(new apiResponse(200, teacher, "Emergency contact updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
}); 
