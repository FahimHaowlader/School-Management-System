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


