import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


// model
import  Routine  from "../../models/routine.model.js";
import RoutineTimeSlot from "../../models/routineTimeSlot.model.js";

// get all routines for a specific teacher
export const getRoutinesByTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!teacherId) {
      throw new apiError(400, "Teacher ID is required");
    }

    const routines = await Routine.find({ teacherId }).populate("subjectId classId sectionId");
    return res.status(200).json(new apiResponse(200, routines, "Routines fetched successfully for the teacher"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

