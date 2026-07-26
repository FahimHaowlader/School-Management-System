import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

// model
import Class from "../../models/class.model.js";
import Subject from "../../models/subject.model.js";
import ClassTimeSlot from "../../models/classTimeSlot.model.js";
import Teacher from "../../models/teacher.model.js";
import { Routine } from "../../models/routine.model.js";

// get all classes for a teacher with specific year
const getAllClassesForTeacher = asyncHandler(async (req, res) => {
  try {
    const { teacher_id, year } = req.query;

    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      throw new apiError(400, "Invalid teacher ID");
    }

    if (!year) {
      throw new apiError(400, "Year is required");
    }
    const academicYear = Number(year);

    if (isNaN(academicYear) || academicYear < 2025) {
      throw new apiError(400, "provide valid year");
    }

    const teacher = await Teacher.findById(teacher_id)
      .populate({
        path: "classes.class_id",
        match: { academicYear: Number(academicYear) },
        select: "academicYear className section group shift classTeacher",
        populate: {
          path: "classTeacher",
          select: "fullName email",
        },
      })
      .populate({
        path: "classes.subject_id",
        select: "subjectName subjectCode paper",
      })
      .lean();

    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    // Extract and filter the classes array directly
    const classes = teacher.classes.filter((item) => item.class_id !== null);

    return res
      .status(200)
      .json(new apiResponse(200, classes, "Classes fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get all student of a class
const getAllStudentOfClass = asyncHandler(async (req, res) => {
  try {
    const class_id = req.query?.class_id;
    if (!class_id) {
      throw new apiError(400, "Class ID is required");
    }
    if (!mongoose.Types.ObjectId.isValid(class_id)) {
      throw new apiError(400, "Invalid class ID");
    }

    const classData = await Class.findById(class_id)
      .populate({
        path: "students",
        select: "fullName email rollNumber",
      })
      .lean();

    if (!classData) {
      throw new apiError(404, "Class not found");
    }

    if (!classData.students || classData.students.length === 0) {
      throw new apiError(404, "No students found for this class");
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          classData.students,
          "Students fetched successfully",
        ),
      );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get class time slots for a specific class
export const getClassTimeSlots = asyncHandler(async (req, res) => {
  const class_id = req.query?.class_id;

  if (!class_id) {
    throw new apiError(400, "Class ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(class_id)) {
    throw new apiError(400, "Invalid class ID");
  }

  const timeSlots = await Routine.find({ class_id })
    .populate({
      path: "subject_id",
      select: "subjectName subjectCode paper",
    })
    .populate({
      path: "teacher_id",
      select: "fullName email phone",
    })
    .populate({
      path: "class_id",
      select: "className section academicYear shift group",
    })
    .sort({ dayOfWeek: 1, startTime: 1 }) // Sorts by day and schedule time
    .lean();

  if (!timeSlots || timeSlots.length === 0) {
    throw new apiError(404, "No time slots found for this class");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        timeSlots,
        "Class time slots retrieved successfully"
      )
    );
});


// get marks of a specipic class  and spefic subject and specific year
export const getClassMarks = asyncHandler(async (req, res) => {
  try {
    const { class_id, subject_id, year } = req.query;

    if (!class_id || !subject_id || !year) {
      throw new apiError(400, "Class ID, Subject ID, and Year are required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(class_id) ||
      !mongoose.Types.ObjectId.isValid(subject_id)
    ) {
      throw new apiError(400, "Invalid Class ID or Subject ID");
    }

    const academicYear = Number(year);
    if (isNaN(academicYear) || academicYear < 2025) {
      throw new apiError(400, "Provide a valid year");
    }

    // Fetch the class and subject details
    const classData = await Class.findById(class_id).lean();
    const subjectData = await Subject.findById(subject_id).lean();

    if (!classData) {
      throw new apiError(404, "Class not found");
    }

    if (!subjectData) {
      throw new apiError(404, "Subject not found");
    }

    // Here you would implement the logic to fetch and calculate performance data
    // For now, we'll just return the class and subject details as a placeholder
    return res.status(200).json(
      new apiResponse(
        200,
        { class: classData, subject: subjectData },
        "Class performance data fetched successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// get all assignment for a specific class and subject
export const getAllAssignmentsForClassAndSubject = asyncHandler(async (req, res) => {
  try {
    const { class_id, subject_id } = req.query;

    if (!class_id || !subject_id) {
      throw new apiError(400, "Class ID and Subject ID are required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(class_id) ||
      !mongoose.Types.ObjectId.isValid(subject_id)
    ) {
      throw new apiError(400, "Invalid Class ID or Subject ID");
    }

    // Fetch assignments based on class and subject
    const assignments = await Assignment.find({
      class_id,
      subject_id,
    })
      .populate({  
        path: "class_id",
        select: "className section academicYear shift group",
      })
      .populate({
        path: "subject_id",
        select: "subjectName subjectCode paper",
      })
      .populate({ 
        path: "teacher_id",
        select: "fullName email phone",
      })
      .sort({ createdAt: -1 }) // Sort by most recent first
      .lean();

    if (!assignments || assignments.length === 0) {
      throw new apiError(404, "No assignments found for this class and subject");
    }

    return res.status(200).json(
      new apiResponse(
        200,
        assignments,
        "Assignments fetched successfully"
      )
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});






