import apiError from "../../utils/apiError";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import
import Attendance from "../../models/attendance.model.js";
import Student from "../../models/student.model.js";


// 🔹 Student Attendance Retrieval
export const getStudentAttendance = asyncHandler(async (req, res) => {
  try {
    let student_id = req.user._id  || req.body.student_id;
    const studentId = req.body.studentId;

    // validate student_id

    if (!student_id && !studentId) {
      throw new apiError(400, "Student ID is required");
    }

    // Check if student exists

    let studentExists = null;

   if (student_id) {
      studentExists = await Student.findById(student_id).select("_id").lean();
    }
    else if (studentId) {
      studentExists = await Student.findOne({studentId}).select("_id").lean();
      student_id = studentExists?._id;
    }

    if (!studentExists) {
      throw new apiError(404, "Student not found");
    }

    // Current year range
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    // Fetch attendance records for the current year
    const attendanceRecords = await Attendance.find({
      student_id,
      date: { $gte: startOfYear, $lte: endOfYear },
    })
      .sort({ date: -1 }) // newest first
      .select("-studentId -classId -recordedBy -_id") // exclude unnecessary fields
      .lean();

    res.status(200).json(
      new apiResponse(
        200,
        attendanceRecords,
        "Student attendance records retrieved"
      )
    );
  } catch (error) {
    console.error("Get Student Attendance Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Student Attendance By Date
export const getStudentAttendanceByDate = asyncHandler(async (req, res) => {
  try {
    const { studentId, date } = req.body;
    let student_id = req.user._id || req.body.student_id;

    // Validate date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      throw new apiError(400, "Invalid date format");
    }

    // Validate student ID
    if (!student_id && !studentId) {
      throw new apiError(400, "Student ID is required");
    }

    // Find the student to get the internal _id
    let studentExists = null;
    if (studentId) {
      studentExists = await Student.findOne({ studentId }).select("_id").lean();
      student_id = studentExists?._id;
    } else if (student_id) {
      studentExists = await Student.findById(student_id).select("_id").lean();
    }

    if (!studentExists) {
      throw new apiError(404, "Student not found");
    }

    // Define start and end of the day
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    // Fetch a single attendance record for that day
    const attendanceRecord = await Attendance.findOne({
      studentId: student_id,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .sort({ date: -1 })
      .select("-studentId -classId -recordedBy -_id")
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


// 🔹 Student Attendance Marking
export const markStudentAttendance = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user._id;
    const { date, status, student_id, classId } = req.body;

    if (!teacher_id) throw new apiError(400, "Teacher ID is required");
    if (!date || !status || !student_id || !classId) {
      throw new apiError(400, "Please provide all required fields");
    }

    const allowedStatus = ["present", "absent", "late"];
    if (!allowedStatus.includes(status)) {
      throw new apiError(400, "Invalid attendance status");
    }

    const attendanceDate = new Date(date);

    const result = await Attendance.findOneAndUpdate(
      { student_id, date: attendanceDate },
      {
        $setOnInsert: {
          student_id,
          date: attendanceDate,
          status,
          classId,
          recordedBy: teacher_id,
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
 
// 🔹 Student Attendance Update
export const updateStudentAttendance = asyncHandler(
  async (req, res) => {
    try {
      const teacher_id = req.user._id;
  
      const { status,attendance_id,} = req.body;

      // Validate student_id
      if (!teacher_id) {
        throw new apiError(400, "Teacher ID is required to update attendance");
      }

      // Validate required fields
      if (!status || !attendance_id) {
        throw new apiError(400, "Please provide all required fields");
      }

      // Find and update attendance record
      const updatedAttendance = await Attendance.findOneAndUpdate(
        { _id: attendance_id, recordedBy: teacher_id },
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
      console.error("Update Student Attendance Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);  

