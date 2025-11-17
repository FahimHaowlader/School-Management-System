import apiError from "../../utils/apiError";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

// Model Import
import Attendance from "../../models/attendance.model.js";
import  Teacher  from "../../models/teacher.model.js";

// 🔹 Teacher Attendance Retrieval
export const getTeacherAttendance = asyncHandler(async (req, res) => {
  try {
    let teacher_id = req.user._id  || req.body.teacher_id;
    const teacherId = req.body.teacherId;

    // validate teacher_id

    if (!teacher_id && !teacherId) {
      throw new apiError(400, "Teacher ID is required");
    }

    // Check if teacher exists

    let teacherExists = null;

   if (teacher_id) {
      teacherExists = await Teacher.findById(teacher_id).select("_id").lean();
    }
    else if (teacherId) {
      teacherExists = await Teacher.findOne({teacherId}).select("_id").lean();
      teacher_id = teacherExists?._id;
    }

    if (!teacherExists) {
      throw new apiError(404, "Teacher not found");
    }

    // Current year range
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    // Fetch attendance records for the current year
    const attendanceRecords = await Attendance.find({
      teacher_id,
      date: { $gte: startOfYear, $lte: endOfYear },
    })
      .sort({ date: -1 }) // newest first
      .select("-teacher_id -classId -recordedBy") // exclude unnecessary fields
      .lean();

    res.status(200).json(
      new apiResponse(
        200,
        attendanceRecords,
        "Teacher attendance records retrieved"
      )
    );
  } catch (error) {
    console.error("Get Teacher Attendance Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 Teacher Attendance By Date
export const getTeacherAttendanceByDate = asyncHandler(async (req, res) => {
  try {
    const { teacherId, date } = req.body;
    let teacher_id = req.user._id || req.body.teacher_id;
    // Validate date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      throw new apiError(400, "Invalid date format");
    }

    // Validate teacher ID
    if (!teacher_id && !teacherId) {
      throw new apiError(400, "Teacher ID is required");
    }

    // Find the teacher to get the internal _id
    let teacherExists = null;
    if (teacherId) {
      teacherExists = await Teacher.findOne({ teacherId }).select("_id").lean();
      teacher_id = teacherExists?._id;
    } else if (teacher_id) {
      teacherExists = await Teacher.findById(teacher_id).select("_id").lean();
    }

    if (!teacherExists) {
      throw new apiError(404, "Teacher not found");
    }

    // Define start and end of the day
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    // Fetch a single attendance record for that day
    const attendanceRecord = await Attendance.findOne({
      teacher_id,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .sort({ date: -1 })
      .select("-teacher_id -classId -recordedBy")
      .lean();

    if (!attendanceRecord) {
      throw new apiError(404, "No attendance record found for the specified date");
    }

    res.status(200).json(
      new apiResponse(
        200,
        attendanceRecord,
        "Student attendance record retrieved"
      )
    );
  } catch (error) {
    console.error("Get Student Attendance By Day Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 Teacher Attendance Marking
export const markTeacherAttendance = asyncHandler(async (req, res) => {
  try {
    const principal_id = req.user._id;
    const { date, status, teacher_id } = req.body;

    if (!principal_id) throw new apiError(400, "Teacher ID is required");
    if (!date || !status || !teacher_id ) {
      throw new apiError(400, "Please provide all required fields");
    }

    const allowedStatus = ["present", "absent", "late","leave","half-day"];
    if (!allowedStatus.includes(status)) {
      throw new apiError(400, "Invalid attendance status");
    }

    const attendanceDate = new Date(date);

    const result = await Attendance.findOneAndUpdate(
      { teacher_id, date: attendanceDate },
      {
        $setOnInsert: {
          teacher_id,
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
 

// 🔹 Teacher Attendance Update
export const updateTeacherAttendance = asyncHandler(
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
      console.error("Update Teacher Attendance Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);  