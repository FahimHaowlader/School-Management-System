import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


// model
import  Routine  from "../../models/routine.model.js";
import RoutineTimeSlot from "../../models/routineTimeSlot.model.js";


// update the status of a specific routine
export const updateRoutineStatus = asyncHandler(async (req, res) => {
  try {
    const { routineId, newStatus } = req.body;

    if (!routineId || !newStatus) {
      throw new apiError(400, "Both routineId and newStatus are required");
    }

    if (!mongoose.Types.ObjectId.isValid(routineId)) {
      throw new apiError(400, "Invalid routineId");
    }

    const routine = await Routine.findById(routineId);
    if (!routine) {
      throw new apiError(404, "Routine not found");
    }

    // Update the routine status
    routine.status = newStatus;
    await routine.save();

    return res.status(200).json(new apiResponse(200, routine, "Routine status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new time slot for routines
export const addRoutineTimeSlot = asyncHandler(async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      throw new apiError(400, "Both startTime and endTime are required");
    }

    // Create a new routine time slot
    const newRoutineTimeSlot = new RoutineTimeSlot({ startTime, endTime });
    await newRoutineTimeSlot.save();

    return res.status(201).json(new apiResponse(201, newRoutineTimeSlot, "New routine time slot added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// change the time slot of a specific routine
export const changeRoutineTimeSlot = asyncHandler(async (req, res) => {
  try {
    const { routineId, newTimeSlotId } = req.body;

    if (!routineId || !newTimeSlotId) {
      throw new apiError(400, "Both routineId and newTimeSlotId are required");
    }

    if (!mongoose.Types.ObjectId.isValid(routineId) || !mongoose.Types.ObjectId.isValid(newTimeSlotId)) {
      throw new apiError(400, "Invalid routineId or newTimeSlotId");
    }

    const routine = await Routine.findById(routineId);
    if (!routine) {
      throw new apiError(404, "Routine not found");
    }

    const newTimeSlot = await RoutineTimeSlot.findById(newTimeSlotId);
    if (!newTimeSlot) {
      throw new apiError(404, "New time slot not found");
    }

    // Update the routine
    routine.timeSlotId = newTimeSlotId;
    await routine.save();

    return res.status(200).json(new apiResponse(200, routine, "Routine time slot updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


//change class routine
export const changeClassRoutine = asyncHandler(async (req, res) => {
  try {
    const { classId, sectionId, newRoutine } = req.body;

    if (!classId || !sectionId || !newRoutine) {
      throw new apiError(400, "classId, sectionId, and newRoutine are required");
    }

    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(sectionId)) {
      throw new apiError(400, "Invalid classId or sectionId");
    }

    // Find the existing routine for the class and section
    const existingRoutine = await Routine.findOne({ classId, sectionId });
    if (!existingRoutine) {
      throw new apiError(404, "Existing routine not found for the specified class and section");
    }

    // Update the routine with the new routine data
    existingRoutine.routineData = newRoutine; // Assuming 'routineData' is the field that holds the routine details
    await existingRoutine.save();
    
    return res.status(200).json(new apiResponse(200, existingRoutine, "Class routine updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new routine for a specific class and section
export const addClassRoutine = asyncHandler(async (req, res) => {
  try {
    const { classId, sectionId, routineData } = req.body;

    if (!classId || !sectionId || !routineData) {
      throw new apiError(400, "classId, sectionId, and routineData are required");
    }

    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(sectionId)) {
      throw new apiError(400, "Invalid classId or sectionId");
    }

    // Check if a routine already exists for the class and section
    const existingRoutine = await Routine.findOne({ classId, sectionId });
    if (existingRoutine) {
      throw new apiError(409, "A routine already exists for the specified class and section");
    }

    // Create a new routine
    const newRoutine = new Routine({ classId, sectionId, routineData });
    await newRoutine.save();

    return res.status(201).json(new apiResponse(201, newRoutine, "New class routine added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


