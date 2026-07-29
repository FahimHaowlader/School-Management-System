import mongoose from "mongoose";
//utils
import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


// model
import  Routine  from "../../models/routine.model.js";
import RoutineTimeSlot from "../../models/routineTimeSlot.model.js";


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

// add a new routine time slot
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

// delete a routine time slot by ID
export const deleteRoutineTimeSlotById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid routine time slot ID");
    }

    const routineTimeSlot = await RoutineTimeSlot.findById(id);
    if (!routineTimeSlot) {
      throw new apiError(404, "Routine time slot not found");
    }

    await RoutineTimeSlot.findByIdAndDelete(id);

    return res.status(200).json(new apiResponse(200, null, "Routine time slot deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new routine for a specific class and section
export const addRoutine = asyncHandler(async (req, res) => {
  try {
    const { classId, sectionId, subjectId, teacherId, timeSlotId } = req.body;

    if (!classId || !sectionId || !subjectId || !teacherId || !timeSlotId) {
      throw new apiError(400, "All fields are required");
    }

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(classId) ||
      !mongoose.Types.ObjectId.isValid(sectionId) ||
      !mongoose.Types.ObjectId.isValid(subjectId) ||
      !mongoose.Types.ObjectId.isValid(teacherId) ||
      !mongoose.Types.ObjectId.isValid(timeSlotId)
    ) {
      throw new apiError(400, "Invalid ObjectIds provided");
    }

    // Create a new routine
    const newRoutine = new Routine({ classId, sectionId, subjectId, teacherId, timeSlotId });
    await newRoutine.save();

    return res.status(201).json(new apiResponse(201, newRoutine, "New routine added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update an existing routine by ID
export const updateRoutineById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { classId, sectionId, subjectId, teacherId, timeSlotId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid routine ID");
    }

    const routine = await Routine.findById(id);
    if (!routine) {
      throw new apiError(404, "Routine not found");
    }

    // Update the routine fields if provided
    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        throw new apiError(400, "Invalid classId");
      }
      routine.classId = classId;
    }
    if (sectionId) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        throw new apiError(400, "Invalid sectionId");
      }
      routine.sectionId = sectionId;
    }
    if (subjectId) {
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        throw new apiError(400, "Invalid subjectId");
      }
      routine.subjectId = subjectId;
    }
    if (teacherId) {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        throw new apiError(400, "Invalid teacherId");
      }
      routine.teacherId = teacherId;
    }
    if (timeSlotId) {
      if (!mongoose.Types.ObjectId.isValid(timeSlotId)) {
        throw new apiError(400, "Invalid timeSlotId");
      }
      routine.timeSlotId = timeSlotId;
    }

    await routine.save();

    return res.status(200).json(new apiResponse(200, routine, "Routine updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// delete a routine by ID
export const deleteRoutineById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid routine ID");
    }

    const routine = await Routine.findById(id);
    if (!routine) {
      throw new apiError(404, "Routine not found");
    }

    await Routine.findByIdAndDelete(id);

    return res.status(200).json(new apiResponse(200, null, "Routine deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});


// class routine for specific teacher
export const getRoutineByTeacher = asyncHandler(async (req, res) => {
  try {
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!teacherId) {
      throw new apiError(400, "Teacher ID is required");
    }

    const routines = await Routine.find({ teacherId }).populate("subjectId classId sectionId timeSlotId");
    return res.status(200).json(new apiResponse(200, routines, "Routines fetched successfully for the teacher"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

