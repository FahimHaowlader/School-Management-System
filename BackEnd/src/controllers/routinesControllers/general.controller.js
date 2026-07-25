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
