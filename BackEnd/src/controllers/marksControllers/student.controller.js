import apiError from "../../utils/apiError";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";

// Model Import
import Mark from "../../models/mark.model.js";
import  Student  from "../../models/student.model.js";
import  Subject  from "../../models/subject.model.js";    

// 🔹 Student Mark Retrieval for a Specific Subject and Exam Type and Year
export const getStudentMarksBySubjectAndExamAndYear = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user?._id || req.body.student_id 
    const studentId =  req.body.studentId;
    const { examType, subjectCode, academicYear } = req.body;

    // ---------------- Validate inputs ----------------
    if (!student_id && !studentId) throw new apiError(400, "Student ID is required");
    if (!academicYear) throw new apiError(400, "Academic year is required");
    if (!subjectCode) throw new apiError(400, "Subject code is required");
    if (!examType) throw new apiError(400, "Exam type is required");

    // ---------------- Check if student exists ----------------
    let studentExists;
    if(student_id){
     studentExists = await Student.findById(student_id).select("_id").lean();
    } else if(studentId){
     studentExists = await Student.findOne({ studentId }).select("_id").lean();
     student_id = studentExists?._id;
    }
    if (!studentExists) throw new apiError(404, "Student not found");

    // ---------------- Find Subject ID ----------------
    const subject = await Subject.findOne({ subjectCode }).select("_id").lean();
    if (!subject) throw new apiError(404, "Subject not found with the provided subject code");
    const subject_id = subject._id;

    // ---------------- Single Aggregation ----------------
    const result = await Student.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(student_id) } },
      { $unwind: "$classes" }, // expand classes array
      {
        $lookup: {
          from: "enrollments",
          localField: "classes",
          foreignField: "_id",
          as: "enrollment"
        }
      },
      { $unwind: "$enrollment" },
      {
        $lookup: {
          from: "classes",
          localField: "enrollment.class_id",
          foreignField: "_id",
          as: "classData"
        }
      },
      { $unwind: "$classData" },
      { $match: { "classData.academicYear": academicYear } },
      {
        $lookup: {
          from: "marks",
          let: { enrollmentId: "$enrollment._id" },
          pipeline: [
            { $match:
                { 
                  $expr: { $and: [
                    { $eq: ["$enrollment_id", "$$enrollmentId"] },
                    { $eq: ["$subject_id", subject_id] },
                    { $eq: ["$examType", examType] }
                  ]}
                }
            }
          ],
          as: "marksRecord"
        }
      },
      { $unwind: { path: "$marksRecord", preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, marksRecord: 1 } },
      { $limit: 1 }
    ]);

    const marksRecord = result?.[0]?.marksRecord ?? null;

    if (!marksRecord) {
      throw new apiError(404, "Marks not found for this subject/exam type");
    }

    return res
      .status(200)
      .json(new apiResponse(200, marksRecord, "Student marks records retrieved"));

  } catch (error) {
    console.error("Get Student Marks Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Student Mark Retrieval for a Specific Exam Type and Year
export const getStudentMarksByExamAndYear = asyncHandler(async (req, res) => {
  try {
    // ---------------- Inputs ----------------
    let student_id = req.user?._id || req.body.student_id 
    const studentId =  req.body.studentId;
    const { examType, academicYear } = req.body;

    // ---------------- Validate inputs ----------------
    if (!student_id && !studentId) throw new apiError(400, "Student ID is required");
    if (!examType) throw new apiError(400, "Exam type is required");
    if (!academicYear) throw new apiError(400, "Academic year is required");

    // ---------------- Check student exists ----------------
    let studentExists;
    if(student_id){
     studentExists = await Student.findById(student_id).select("_id").lean();
    } else if(studentId){
     studentExists = await Student.findOne({ studentId }).select("_id").lean();
     student_id = studentExists?._id;
    }
    if (!studentExists) throw new apiError(404, "Student not found");

    // ---------------- Find Subject ----------------
    // const subject = await Subject.findOne({ subjectCode }).select("_id").lean();
    // if (!subject) throw new apiError(404, "Subject not found");
    // const subject_id = subject._id;

    // ---------------- Aggregation to fetch all marks ----------------
    const result = await Student.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(student_id) } },
      { $unwind: "$classes" }, // expand enrollments
      {
        $lookup: {
          from: "enrollments",
          localField: "classes",
          foreignField: "_id",
          as: "enrollment"
        }
      },
      { $unwind: "$enrollment" },
      {
        $lookup: {
          from: "classes",
          localField: "enrollment.class_id",
          foreignField: "_id",
          as: "classData"
        }
      },
      { $unwind: "$classData" },
      { $match: { "classData.academicYear": academicYear } },
      {
        $lookup: {
          from: "marks",
          let: { enrollmentId: "$enrollment._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$enrollment_id", "$$enrollmentId"] },
                    { $eq: ["$examType", examType] }
                  ]
                }
              }
            }
          ],
          as: "marksRecord"
        }
      },
      { $unwind: { path: "$marksRecord", preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, marksRecord: 1 } }
    ]);

    // Filter out nulls (in case some enrollments have no marks)
    const marksRecords = result
      .map(r => r.marksRecord)
      .filter(r => r !== null);

    if (marksRecords.length === 0) {
      throw new apiError(
        404,
        "No marks found for this student, subject, exam type, and academic year"
      );
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          marksRecords,
          "Student marks records retrieved successfully"
        )
      );

  } catch (error) {
    console.error("Get Student Marks By Exam And Year Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹 Student Mark Retrieval for a Specific Year
export const getStudentMarksByYear = asyncHandler(async (req, res) => {
  try {
    // ---------------- Inputs ----------------
    let student_id = req.user?._id || req.body.student_id 
    const studentId =  req.body.studentId;
    const { academicYear } = req.body;

    // ---------------- Validate inputs ----------------
    if (!student_id && !studentId) throw new apiError(400, "Student ID is required");
    if (!academicYear) throw new apiError(400, "Academic year is required");

    // ---------------- Check student exists ----------------
    let studentExists;
    if(student_id){
     studentExists = await Student.findById(student_id).select("_id").lean();
    } else if(studentId){
     studentExists = await Student.findOne({ studentId }).select("_id").lean();
     student_id = studentExists?._id;
    }
    if (!studentExists) throw new apiError(404, "Student not found");

    // ---------------- Aggregation to fetch all marks ----------------
    const result = await Student.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(student_id) } },
      { $unwind: "$classes" }, // expand enrollments
      {
        $lookup: {
          from: "enrollments",
          localField: "classes",
          foreignField: "_id",
          as: "enrollment"
        }
      },
      { $unwind: "$enrollment" },
      {
        $lookup: {
          from: "classes",
          localField: "enrollment.class_id",
          foreignField: "_id",
          as: "classData"
        }
      },
      { $unwind: "$classData" },
      { $match: { "classData.academicYear": academicYear } },
      {
        $lookup: {
          from: "marks",
          let: { enrollmentId: "$enrollment._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$enrollment_id", "$$enrollmentId"]
                }
              }
            }
          ],
          as: "marksRecord"
        }
      },
      { $unwind: { path: "$marksRecord", preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, marksRecord: 1 } }
    ]);

    // Filter out nulls (in case some enrollments have no marks)
    const marksRecords = result
      .map(r => r.marksRecord)
      .filter(r => r !== null);

    if (marksRecords.length === 0) {
      throw new apiError(
        404,
        "No marks found for this student and academic year"
      );
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          marksRecords,
          "Student marks records retrieved successfully"
        )
      );

  } catch (error) {
    console.error("Get Student Marks By Year Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// 🔹All Student Mark Retrieval for a Specific Year




