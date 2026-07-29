import apiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import

import Enrollment from "../../models/enrollment.model.js";
import  Student  from "../../models/student.model.js";
import Assignment from "../../models/assignment.model.js";



// get all assignment with pagination 
export const getAllAssignments = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch assignments with pagination
    const assignments = await Assignment.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    // Get the total count of assignments for pagination info
    const totalAssignments = await Assignment.countDocuments();

    if (!assignments || assignments.length === 0) {
      throw new apiError(404, "No assignments found");
    }

    return res.status(200).json(
      new apiResponse(200, {
        assignments,
        totalAssignments,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAssignments / limit),
      }, "Assignments fetched successfully")
    );
  } catch (error)  {
    throw new apiError(500, error.message);
  }
});


// search assignments by title or description
export const searchAssignments = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      throw new apiError(400, "Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find assignments that match the search criteria in title or description
    const assignments = await Assignment.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });

    if (!assignments || assignments.length === 0) {
      throw new apiError(404, "No assignments found matching the search criteria");
    }

    return res.status(200).json(new apiResponse(200, assignments, "Assignments retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get asignments by id
export const getAssignmentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new apiError(400, "Assignment ID is required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    return res.status(200).json(new apiResponse(200, assignment, "Assignment retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get assienment grade by id  
export const getAssignmentGradeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new apiError(400, "Assignment ID is required");
    }

    // Find the assignment by ID and populate the grades
    const assignment = await Assignment.findById(id).populate("grades.studentId", "name email");

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    return res.status(200).json(new apiResponse(200, assignment.grades, "Assignment grades retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// add a new assignment
export const addAssignment = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, classId } = req.body;

    // Validate required fields
    if (!title || !description || !dueDate || !classId) {
      throw new apiError(400, "Title, description, due date, and class ID are required");
    }

    // Create a new assignment document
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      classId,
      createdBy: req.user._id, // Assuming req.user contains the authenticated user's info
    });

    await newAssignment.save();

    return res.status(201).json(new apiResponse(201, newAssignment, "Assignment added successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// all pending assignments 
export const getPendingAssignments = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      throw new apiError(400, "Class ID is required");
    }

    // Find assignments that are pending for the specific class
    const pendingAssignments = await Assignment.find({
      classId,
      status: "pending",
    });

    if (!pendingAssignments || pendingAssignments.length === 0) {
      throw new apiError(404, "No pending assignments found for this class");
    }

    return res.status(200).json(new apiResponse(200, pendingAssignments, "Pending assignments retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
}); 

// get all reviewed assignments    
export const getReviewedAssignments = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      throw new apiError(400, "Class ID is required");
    }

    // Find assignments that are reviewed for the specific class
    const reviewedAssignments = await Assignment.find({
      classId,
      status: "reviewed",
    });

    if (!reviewedAssignments || reviewedAssignments.length === 0) {
      throw new apiError(404, "No reviewed assignments found for this class");
    }

    return res.status(200).json(new apiResponse(200, reviewedAssignments, "Reviewed assignments retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get update assignment by id
export const getUpdatedAssignmentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new apiError(400, "Assignment ID is required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }
    
    return res.status(200).json(new apiResponse(200, assignment, "Assignment retrieved successfully"));
    } catch (error) {
    throw new apiError(500, error.message);
  }
});


// update assignment result by id 
export const updateAssignmentResultById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, grade } = req.body;

    if (!id || !studentId || grade === undefined) {
      throw new apiError(400, "Assignment ID, student ID, and grade are required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    // Check if the student already has a grade for this assignment
    const existingGradeIndex = assignment.grades.findIndex(
      (g) => g.studentId.toString() === studentId
    );

    if (existingGradeIndex !== -1) {
      // Update the existing grade
      assignment.grades[existingGradeIndex].grade = grade;
    } else {
      // Add a new grade entry
      assignment.grades.push({ studentId, grade });
    }

    await assignment.save();

    return res.status(200).json(new apiResponse(200, assignment, "Assignment result updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// update assingment basic details by principal
export const updateAssignmentDetailsById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    if (!id) {
      throw new apiError(400, "Assignment ID is required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    // Update the assignment details if provided
    if (title) assignment.title = title;
    if (description) assignment.description = description;
    if (dueDate) assignment.dueDate = dueDate;

    await assignment.save();

    return res.status(200).json(new apiResponse(200, assignment, "Assignment details updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// gading the assignment by principal
export const gradeAssignmentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, grade } = req.body;

    if (!id || !studentId || grade === undefined) {
      throw new apiError(400, "Assignment ID, student ID, and grade are required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    // Check if the student already has a grade for this assignment
    const existingGradeIndex = assignment.grades.findIndex(
      (g) => g.studentId.toString() === studentId
    );

    if (existingGradeIndex !== -1) {
      // Update the existing grade
      assignment.grades[existingGradeIndex].grade = grade;
    } else {
      // Add a new grade entry
      assignment.grades.push({ studentId, grade });
    }

    await assignment.save();

    return res.status(200).json(new apiResponse(200, assignment, "Assignment graded successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// delete assignment by id
export const deleteAssignmentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new apiError(400, "Assignment ID is required");
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    await assignment.remove();

    return res.status(200).json(new apiResponse(200, null, "Assignment deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// add a new assignment for a specific class
export const addAssignmentForClass = asyncHandler(async (req, res) => {
  try {
    const { classId, title, description, dueDate } = req.body;

    if (!classId || !title || !description || !dueDate) {
      throw new apiError(400, "classId, title, description, and dueDate are required");
    }

    // Create a new assignment document for the specific class
    const newAssignment = new Assignment({
      classId,
      title,
      description,
      dueDate,
      createdBy: req.user._id, // Assuming req.user contains the authenticated user's info
    });

    await newAssignment.save();

    return res.status(201).json(new apiResponse(201, newAssignment, "Assignment added successfully for the class"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

