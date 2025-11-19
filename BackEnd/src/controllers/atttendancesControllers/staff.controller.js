import apiError from "../../utils/apiError";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

// Model Import
import Attendance from "../../models/attendance.model.js";
import  Staff  from "../../models/staff.model.js";

// 🔹 Staff Attendance Retrieval
export const getStaffAttendance = asyncHandler(async (req, res) => {
  try {
    let staff_id = req.user._id  || req.body.staff_id;
    const staffId = req.body.staffId;

    // validate staff_id

    if (!staff_id && !staffId) {
      throw new apiError(400, "Staff ID is required");
    }

    // Check if staff exists
    let staffExists = null;

   if (staff_id) {
      staffExists = await Staff.findById(staff_id).select("_id").lean();
    }
    else if (staffId) {
      staffExists = await Staff.findOne({staffId}).select("_id").lean();
      staff_id = staffExists?._id;
    }

    if (!staffExists) {
      throw new apiError(404, "Staff not found");
    }

    // Current year range
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    // Fetch attendance records for the current year
    const attendanceRecords = await Attendance.find({
      staff_id,
      date: { $gte: startOfYear, $lte: endOfYear },
    })
      .sort({ date: -1 }) // newest first
      .select("-staff_id -classId -recordedBy") // exclude unnecessary fields
      .lean();

    res.status(200).json(
      new apiResponse(
        200,
        attendanceRecords,
        "Staff attendance records retrieved"
      )
    );
  } catch (error) {
    console.error("Get Staff Attendance Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 Staff Attendance By Date
export const getStaffAttendanceByDate = asyncHandler(async (req, res) => {
  try {
    const { staffId, date } = req.body;
    let staff_id = req.user._id || req.body.staff_id;
    // Validate date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      throw new apiError(400, "Invalid date format");
    }

    // Validate staff ID
    if (!staff_id && !staffId) {
      throw new apiError(400, "Staff ID is required");
    }

    // Find the staff to get the internal _id
    let staffExists = null;
    
     if (staff_id) {
      staffExists = await Staff.findById(staff_id).select("_id").lean();
    } else if (staffId) {
      staffExists = await Staff.findOne({ staffId }).select("_id").lean();
      staff_id = staffExists?._id;
    } 

    if (!staffExists) {
      throw new apiError(404, "Staff not found");
    }

    // Define start and end of the day
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    // Fetch a single attendance record for that day
    const attendanceRecord = await Attendance.findOne({
      staff_id,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .sort({ date: -1 })
      .select("-staff_id -classId -recordedBy")
      .lean();

    if (!attendanceRecord) {
      throw new apiError(404, "No attendance record found for the specified date");
    }

    res.status(200).json(
      new apiResponse(
        200,
        attendanceRecord,
        "Staff attendance record retrieved"
      )
    );
  } catch (error) {
    console.error("Get Staff Attendance By Day Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 Staff Attendance Marking
export const markStaffAttendance = asyncHandler(async (req, res) => {
  try {
    const principal_id = req.user._id;
    const { date, status, staff_id } = req.body;
    if (!principal_id) throw new apiError(400, "Staff ID is required");
    if (!date || !status || !staff_id ) {
      throw new apiError(400, "Please provide all required fields");
    }

    const allowedStatus = ["present", "absent", "late","leave","half-day"];
    if (!allowedStatus.includes(status)) {
      throw new apiError(400, "Invalid attendance status");
    }

    const attendanceDate = new Date(date);

    const result = await Attendance.findOneAndUpdate(
       { staff_id, date: attendanceDate },
      {
        $setOnInsert: {
          staff_id,
          date: attendanceDate,
          status,
          recordedBy: principal_id,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        rawResult: true, // enables detecting if inserted or not
      }
    ).lean();

    // Detect insert vs return-existing
    const wasInserted = !!result.lastErrorObject?.upserted;

    if (!wasInserted) {
      throw new apiError(409, "Attendance already marked for this date");
    }

    res
      .status(201)
      .json(new apiResponse(201, result.value, "Attendance marked successfully"));
  } catch (error) {
    console.error("Mark Attendance Error:", error);
    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
 

// 🔹 Staff Attendance Update
export const updateStaffAttendance = asyncHandler(
  async (req, res) => {
    try {
      const principal_id = req.user._id;
  
      const { status,attendance_id,} = req.body;

      // Validate student_id
      if (!principal_id) {
        throw new apiError(400, "Teacher ID is required to update attendance");
      }

      // Validate required fields
      if (!status || !attendance_id) {
        throw new apiError(400, "Please provide all required fields");
      }

      // Find and update attendance record
      const updatedAttendance = await Attendance.findOneAndUpdate(
        { _id: attendance_id, recordedBy:principal_id},
        { status },
        { new: true }
      );

      if (!updatedAttendance) {
        throw new apiError(404, "Attendance record not found");
      }

      res
        .status(200)
        .json(new apiResponse(200, updatedAttendance, "Attendance updated successfully"));
    } catch (error) {
      console.error("Update Staff Attendance Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);  