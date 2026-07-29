import mongoose from "mongoose";


import apiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import

import Enrollment from "../../models/enrollment.model.js";
import  Student  from "../../models/student.model.js";
import Assignment from "../../models/assignment.model.js";
import Class from "../../models/class.model.js";


// create a new class
export const createClass = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      throw new apiError(400, "Both name and description are required");
    }

    // Create a new class
    const newClass = new Class({ name, description });
    await newClass.save();

    return res.status(201).json(new apiResponse(201, newClass, "New class created successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// create a new section
export const createSection = asyncHandler(async (req, res) => {
  try {
    const { name, classId } = req.body;

    if (!name || !classId) {
      throw new apiError(400, "Both name and classId are required");
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      throw new apiError(400, "Invalid classId");
    }

    // Create a new section
    const newSection = new Section({ name, classId });
    await newSection.save();

    return res.status(201).json(new apiResponse(201, newSection, "New section created successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update an existing class by ID
export const updateClassById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid class ID");
    }

    const classToUpdate = await Class.findById(id);
    if (!classToUpdate) {
      throw new apiError(404, "Class not found");
    }

    // Update the class fields if provided
    if (name) classToUpdate.name = name;
    if (description) classToUpdate.description = description;

    await classToUpdate.save();

    return res.status(200).json(new apiResponse(200, classToUpdate, "Class updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  } 
});

// update an existing section by ID
export const updateSectionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, classId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid section ID");
    }

    const sectionToUpdate = await Section.findById(id);
    if (!sectionToUpdate) {
      throw new apiError(404, "Section not found");
    }

    // Update the section fields if provided
    if (name) sectionToUpdate.name = name;
    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        throw new apiError(400, "Invalid classId");
      }
      sectionToUpdate.classId = classId;
    }

    await sectionToUpdate.save();

    return res.status(200).json(new apiResponse(200, sectionToUpdate, "Section updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


// deletea class by ID
export const deleteStudentById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid student ID");
    }

    const student = await Student.findById(id);
    if (!student) {
      throw new apiError(404, "Student not found");
    }

    // Delete the student
    await Student.findByIdAndDelete(id);

    // Optionally, you can also delete related enrollments or other associated data here

    return res.status(200).json(new apiResponse(200, null, "Student deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// delete a section by ID
export const deleteSectionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid section ID");
    }

    const section = await Section.findById(id);
    if (!section) {
      throw new apiError(404, "Section not found");
    }

    // Delete the section
    await Section.findByIdAndDelete(id);

    // Optionally, you can also delete related enrollments or other associated data here

    return res.status(200).json(new apiResponse(200, null, "Section deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update a class status by ID
export const updateClassStatusById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid class ID");
    }

    const classToUpdate = await Class.findById(id);
    if (!classToUpdate) {
      throw new apiError(404, "Class not found");
    }

    // Update the class status
    classToUpdate.status = status;
    await classToUpdate.save();

    return res.status(200).json(new apiResponse(200, classToUpdate, "Class status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update a section status by ID
export const updateSectionStatusById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid section ID");
    }

    const sectionToUpdate = await Section.findById(id);
    if (!sectionToUpdate) {
      throw new apiError(404, "Section not found");
    }

    // Update the section status
    sectionToUpdate.status = status;
    await sectionToUpdate.save();

    return res.status(200).json(new apiResponse(200, sectionToUpdate, "Section status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});




