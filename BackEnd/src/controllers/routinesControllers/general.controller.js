import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


// model
import  Routine  from "../../models/routine.model.js";
import RoutineTimeSlot from "../../models/routineTimeSlot.model.js";


// get all general routines 
export const getGeneralRoutines = asyncHandler(async (req, res) => {
  try {
    const classId = req.query.classId; // Get classId from query parameters 
    if (!classId) {
      throw new apiError(400, "classId query parameter is required");
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      throw new apiError(400, "Invalid classId");
    }

    const routines = await Routine.find({ classId }).populate("subjectId teacherId classId");
    return res.status(200).json(new apiResponse(200, routines, "General routines fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


//get routine slots  time 
export const getRoutineSlots = asyncHandler(async (req, res) => {
  try {
    const routineSlots = await RoutineTimeSlot.find().sort({ startTime: 1 });
    return res.status(200).json(new apiResponse(200, routineSlots, "Routine slots fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get routine of a specific class section
export const getRoutineByClassSection = asyncHandler(async (req, res) => {
  try {
    const { classId, sectionId } = req.query;

    if (!classId || !sectionId) {
      throw new apiError(400, "Both classId and sectionId query parameters are required");
    }

    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(sectionId)) {
      throw new apiError(400, "Invalid classId or sectionId");
    }

    const routine = await Routine.findOne({ classId, sectionId }).populate("subjectId teacherId classId");
    if (!routine) {
      throw new apiError(404, "Routine not found for the specified class and section");
    }

    return res.status(200).json(new apiResponse(200, routine, "Routine fetched successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// get routines for specific year
export const getRoutinesByYear = asyncHandler(async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      throw new apiError(400, "Year query parameter is required");
    }

    const routines = await Routine.find({ year }).populate("subjectId teacherId classId");
    return res.status(200).json(new apiResponse(200, routines, "Routines fetched successfully for the specified year"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
}); 


// serach free techer for specific time slot
export const searchFreeTeachersByTimeSlot = asyncHandler(async (req, res) => {
  try {
    const { timeSlotId } = req.query;

    if (!timeSlotId) {
      throw new apiError(400, "timeSlotId query parameter is required");
    }

    if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
      throw new apiError(400, "Invalid timeSlotId");
    }

    // Find all routines that have the specified time slot
    const routinesWithTimeSlot = await Routine.find({ timeSlotId }).select("teacherId");

    // Extract teacher IDs from the routines
    const busyTeacherIds = routinesWithTimeSlot.map(routine => routine.teacherId.toString());

    // Find teachers who are not in the busyTeacherIds list
    const freeTeachers = await Teacher.find({ _id: { $nin: busyTeacherIds } });

    return res.status(200).json(new apiResponse(200, freeTeachers, "Free teachers fetched successfully for the specified time slot"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});
