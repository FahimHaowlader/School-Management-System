import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";



import Syllabus from "../../models/syllabus.model.js";
import Class from "../../models/class.model.js";



export const getSyllabusByClassAndYear = asyncHandler(async (req, res, ) => {
  const { class: classLevel, year } = req.body;

  // 1. Validate inputs exist and are valid numbers
  const parsedClass = Number(classLevel);
  const parsedYear = Number(year);

  if (!classLevel || isNaN(parsedClass) || parsedClass < 1 || parsedClass > 12) {
    return new apiError(400, "A valid class number (1-12) is required in the body");
  }

  const currentYear = new Date().getFullYear();
  if (!year || isNaN(parsedYear) || parsedYear < 2025 || parsedYear > currentYear + 1) {
    return next(
      new apiError(400, `Academic year is required and must be between 2025 and ${currentYear + 1}`)
    );
  }

  // 2. Find matching Class documents to get their ObjectIds
  const matchingClasses = await Class.find({
    class: parsedClass,
    academicYear: parsedYear,
  }).select("_id");

  if (!matchingClasses.length) {
    return next(
      new apiError(404, `No class found for Class ${parsedClass} in academic year ${parsedYear}`)
    );
  }

  // Extract array of matching class ObjectIds
  const classIds = matchingClasses.map((c) => c._id);

  // 3. Query Syllabus and populate Subject along with its assigned Teacher
  const syllabi = await Syllabus.find({ classId: { $in: classIds } })
    .populate("classId", "class section shift group academicYear")
    .populate({
      path: "subjectId",
      select: "name code teacherId",
      populate: {
        path: "teacherId",
        select: "prefixName firstName middleName lastName",
      },
    })
    .select("-__v");

  if (!syllabi.length) {
    return next(
      new apiError(404, `No syllabus found for Class ${parsedClass} (${parsedYear})`)
    );
  }

  res.status(200).json(
    new apiResponse(200, "Syllabi retrieved successfully", {
      total: syllabi.length,
      syllabi,
    })
  );
});


// update syllabus for a specific class and subject
export const updateSyllabus = asyncHandler(async (req, res) => {
  const { classId, subjectId, syllabusContent } = req.body;

  if (!classId || !subjectId || !syllabusContent) {
    return next(new apiError(400, "classId, subjectId, and syllabusContent are required"));
  }

  if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
    return next(new apiError(400, "Invalid classId or subjectId"));
  }

  const syllabus = await Syllabus.findOne({ classId, subjectId });

  if (!syllabus) {
    return next(new apiError(404, "Syllabus not found for the specified class and subject"));
  }

  syllabus.syllabusContent = syllabusContent;
  await syllabus.save();

  res.status(200).json(new apiResponse(200, "Syllabus updated successfully", syllabus));
});

// add new syllabus for a specific class and subject
export const addSyllabus = asyncHandler(async (req, res) => {
  const { classId, subjectId, syllabusContent } = req.body;

  if (!classId || !subjectId || !syllabusContent) {
    return next(new apiError(400, "classId, subjectId, and syllabusContent are required"));
  }

  if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
    return next(new apiError(400, "Invalid classId or subjectId"));
  }

  const existingSyllabus = await Syllabus.findOne({ classId, subjectId });

  if (existingSyllabus) {
    return next(new apiError(409, "Syllabus already exists for the specified class and subject"));
  }

  const newSyllabus = new Syllabus({
    classId,
    subjectId,
    syllabusContent,
  });

  await newSyllabus.save();

  res.status(201).json(new apiResponse(201, "Syllabus added successfully", newSyllabus));
});

// delete syllabus for a specific class and subject
export const deleteSyllabus = asyncHandler(async (req, res) => {
  const { classId, subjectId } = req.body;

  if (!classId || !subjectId) {
    return next(new apiError(400, "classId and subjectId are required"));
  }

  if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
    return next(new apiError(400, "Invalid classId or subjectId"));
  }

  const syllabus = await Syllabus.findOne({ classId, subjectId });

  if (!syllabus) {
    return next(new apiError(404, "Syllabus not found for the specified class and subject"));
  }

  await syllabus.remove();

  res.status(200).json(new apiResponse(200, "Syllabus deleted successfully", syllabus));
});


// replace the pdf file of a syllabus for a specific class and subject
export const replaceSyllabusPdf = asyncHandler(async (req, res) => {
  const { classId, subjectId } = req.body;
  const pdfFile = req.file; // Assuming you're using multer for file uploads

  if (!classId || !subjectId || !pdfFile) {
    return next(new apiError(400, "classId, subjectId, and pdfFile are required"));
  }

  if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
    return next(new apiError(400, "Invalid classId or subjectId"));
  }

  const syllabus = await Syllabus.findOne({ classId, subjectId });

  if (!syllabus) {
    return next(new apiError(404, "Syllabus not found for the specified class and subject"));
  }

  // Assuming you have a field in your Syllabus model to store the PDF file path
  syllabus.pdfFile = pdfFile.path; // Update the path to the new PDF file
  await syllabus.save();

  res.status(200).json(new apiResponse(200, "Syllabus PDF replaced successfully", syllabus));
});