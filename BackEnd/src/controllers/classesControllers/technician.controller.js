import apiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import

import Enrollment from "../../models/enrollment.model.js";
import  Student  from "../../models/student.model.js";
import Assignment from "../../models/assignment.model.js";
import Class from "../../models/class.model.js";


// get all classes of the. school 
export const getAllClasses = asyncHandler(async (req, res) => {
  try {
    const classes = await Class.find().lean();

    if (!classes || classes.length === 0) {
      throw new apiError(404, "No classes found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, classes, "Classes fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// add new class
export const addNewClass = asyncHandler(async (req, res) => {
  try {
    const { name, section, year } = req.body;

    // Validate required fields
    if (!name || !section || !year) {
      throw new apiError(400, "Name, section, and year are required");
    }

    // Check if the class already exists
    const existingClass = await Class.findOne({ name, section, year });
    if (existingClass) {
      throw new apiError(400, "Class with the same name, section, and year already exists");
    }

    // Create a new class
    const newClass = new Class({ name, section, year });
    await newClass.save();

    return res
      .status(201)
      .json(new apiResponse(201, newClass, "Class created successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all ppending classes of the school
export const getAllPendingClasses = asyncHandler(async (req, res) => {
  try {
    const pendingClasses = await Class.find({ status: "pending" }).lean();

    if (!pendingClasses || pendingClasses.length === 0) {
      throw new apiError(404, "No pending classes found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, pendingClasses, "Pending classes fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all reviewed classes of the school
export const getAllReviewedClasses = asyncHandler(async (req, res) => {
  try {
    const reviewedClasses = await Class.find({ status: "reviewed" }).lean();

    if (!reviewedClasses || reviewedClasses.length === 0) {
      throw new apiError(404, "No reviewed classes found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, reviewedClasses, "Reviewed classes fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// delete a class
export const deleteClass = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      throw new apiError(400, "Class ID is required");
    }

    // Find the class by ID
    const classToDelete = await Class.findById(classId);

    if (!classToDelete) {
      throw new apiError(404, "Class not found");
    }

    // Delete the class
    await Class.findByIdAndDelete(classId);

    return res
      .status(200)
      .json(new apiResponse(200, null, "Class deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all students of a specific class
export const getAllStudentsOfClass = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      throw new apiError(400, "Class ID is required");
    }

    // Find enrollments for the specific class and populate student details
    const enrollments = await Enrollment.find({ classId })
      .populate({
        path: "studentId",
        select: "name email avatar rollNumber phone", // Select only needed fields
      })
      .exec();

    if (!enrollments || enrollments.length === 0) {
      return res.status(200).json(
        new apiResponse(200, [], "No students found for this class")
      );
    }

    // Extract student details from enrollment documents
    const students = enrollments
      .map((enrollment) => enrollment.studentId)
      .filter(Boolean); // Filters out any null entries if a student account was deleted

    return res.status(200).json(
      new apiResponse(200, students, "Students retrieved successfully")
    );
  } catch (error) {
    throw new apiError(
      error.statusCode || 500,
      error.message || "Failed to fetch students"
    );
  }
});


// get all section of a class 
export const getAllSectionsOfClass = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      throw new apiError(400, "Class ID is required");
    }

    // Find the class by ID
    const classData = await Class.findById(classId).lean();

    if (!classData) {
      throw new apiError(404, "Class not found");
    }

    // Assuming sections are stored in the class document as an array
    const sections = classData.sections || [];

    return res
      .status(200)
      .json(new apiResponse(200, sections, "Sections retrieved successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// add new section to a class
export const addNewSectionToClass = asyncHandler(async (req, res) => {
  try {
    const { classId } = req.params;
    const { sectionName } = req.body;

    if (!classId || !sectionName) {
      throw new apiError(400, "Class ID and Section Name are required");
    }

    // Find the class by ID
    const classData = await Class.findById(classId);

    if (!classData) {
      throw new apiError(404, "Class not found");
    }

    // Check if the section already exists
    if (classData.sections.includes(sectionName)) {
      throw new apiError(400, "Section already exists for this class");
    }

    // Add the new section to the class
    classData.sections.push(sectionName);
    await classData.save();

    return res
      .status(201)
      .json(new apiResponse(201, classData, "Section added successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all students of a specific class
export const getAllStudentsOfClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  if (!classId) {
    throw new apiError(400, "Class ID is required");
  }

  // Find enrollments for the specific class and populate student details
  const enrollments = await Enrollment.find({ classId })
    .populate({
      path: "studentId",
      select: "name email avatar rollNumber phone", // Select only needed fields
    })
    .lean() // Converts Mongoose documents to plain JS objects for better performance
    .exec();

  if (!enrollments || enrollments.length === 0) {
    return res
      .status(200)
      .json(new apiResponse(200, [], "No students found for this class"));
  }

  // Extract student details from enrollment documents
  const students = enrollments
    .map((enrollment) => enrollment.studentId)
    .filter(Boolean); // Filters out nulls if a referenced student was deleted

  return res
    .status(200)
    .json(new apiResponse(200, students, "Students retrieved successfully"));
});


// delete a section from a class
export const deleteSectionFromClass = asyncHandler(async (req, res) => {
  try {
    const { classId, sectionName } = req.params;

    if (!classId || !sectionName) {
      throw new apiError(400, "Class ID and Section Name are required");
    }

    // Find the class by ID
    const classData = await Class.findById(classId);

    if (!classData) {
      throw new apiError(404, "Class not found");
    }

    // Check if the section exists
    const sectionIndex = classData.sections.indexOf(sectionName);
    if (sectionIndex === -1) {
      throw new apiError(404, "Section not found in this class");
    }

    // Remove the section from the class
    classData.sections.splice(sectionIndex, 1);
    await classData.save();
    
    return res
      .status(200)
      .json(new apiResponse(200, classData, "Section deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

