import apiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import

import Enrollment from "../../models/enrollment.model.js";
import  Student  from "../../models/student.model.js";
import Assignment from "../../models/assignment.model.js";


//  Assignment overview for a specific academic year And Class

export const getStudentAssignmentsDetailedForYearAndClass = asyncHandler(async (req, res) => {
  try {
    let student_id = req.user?._id || req.body.student_id;
    const studentId = req.body.studentId;
    const { academicYear } = req.body;

    // ---------------- Validate Inputs ----------------
    if (!student_id && !studentId)
      throw new apiError(400, "Student ID is required");
    if (!academicYear)
      throw new apiError(400, "Academic year is required");

    // ---------------- Find Student ----------------
    let studentExists;
    if (student_id) {
      studentExists = await Student.findById(student_id).select("_id").lean();
    } else {
      studentExists = await Student.findOne({ studentId }).select("_id").lean();
      student_id = studentExists?._id;
    }
    if (!studentExists)
      throw new apiError(404, "Student not found");

    // ---------------- Aggregate Assignments ----------------
    const data = await Enrollment.aggregate([
      { $match: { student_id: new mongoose.Types.ObjectId(student_id) } },
      {
        $lookup: {
          from: "classes",
          localField: "class_id",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      { $unwind: "$classInfo" },
      { $match: { "classInfo.academicYear": Number(academicYear) } },
      { $unwind: { path: "$assignments", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "assignments",
          localField: "assignments.assignment_id",
          foreignField: "_id",
          as: "assignmentInfo",
        },
      },
      { $unwind: "$assignmentInfo" },
      {
        $lookup: {
          from: "subjects",
          localField: "assignmentInfo.subject_id",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      { $unwind: "$subjectInfo" },
      {
        $project: {
          _id: 0,
          assignment_id: "$assignments.assignment_id",
          isSubmitted: "$assignments.isSubmitted",
          score: "$assignments.marks",
          submittedDate: "$assignments.submittedDate",
          submittedDocuments: "$assignments.submittedDocuments",
          submissionDate: "$assignmentInfo.submissionDate",
          mark: "$assignmentInfo.marks",
          title: "$assignmentInfo.title",
          subject_id: "$assignmentInfo.subject_id",
          subjectName: "$subjectInfo.subjectName", // ✅ include subject name
          paper: "$subjectInfo.paper",
        },
      },
    ]);

    if (!data || data.length === 0)
     throw new apiError(404, "No assignments found for the specified year and class");

    return res.status(200)
    .json(new apiResponse( 
       200,
        data,
      "Assignments fetched successfully"
    ));

  } catch (error) {
    return res.status(500).json({ status: 500, data: null, message: "Server error: " + error.message });
  }
});


//  Assignment overview for a  specific id 
export const getStudentAssignmentDetailedById = asyncHandler(async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    // ---------------- Validate Input ----------------
    if (!assignmentId) {
      throw new apiError(400, "Assignment ID is required");
    }

    // ---------------- Find Assignment ----------------
    const assignment = await Assignment.findById(assignmentId).lean();

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    // ---------------- Return Assignment ----------------
    return res.status(200)
    .json( new apiResponse( 
       200,
        assignment,
      "Assignment fetched successfully"
    ));

  } catch (error) {
    return res.status(500).json({ status: 500, data: null, message: "Server error: " + error.message });
  }
});


// 🔹 Student submit assignmrnt 
export const assignmentSubmitByStudent = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user?._id;
    const { assignmentId, submittedDocuments } = req.body;

    // ---------------- Validate Inputs ----------------
    if (!student_id) throw new apiError(400, "Student ID is required");
    if (!assignmentId) throw new apiError(400, "Assignment ID is required");
    if (!submittedDocuments || !Array.isArray(submittedDocuments) || submittedDocuments.length === 0) {
      throw new apiError(400, "At least one submitted document is required");
    }

    // ---------------- Update Assignment Submission ----------------
    const enrollment = await Enrollment.findOneAndUpdate(
      { student_id, "assignments.assignment_id": assignmentId },
      {
        $set: {
          "assignments.$.isSubmitted": true,
          "assignments.$.submittedDate": new Date(),
          "assignments.$.submittedDocuments": submittedDocuments,
        },
      },
      { new: true } // return updated document
    );

    if (!enrollment) {
      throw new apiError(404, "Enrollment or Assignment not found for this student");
    }

    // ---------------- Return Success Response ----------------
    return res.status(200).json({
      status: 200,
      data: null,
      message: "Assignment submitted successfully",
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || 500,
      data: null,
      message: error.message || "Server error",
    });
  }
});


// 🔹 Student submitted documnet view 

export const viewSubmittedDocumentsByStudent = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user?._id;
    const { assignmentId } = req.body;

    // ---------------- Validate Inputs ----------------
    if (!student_id) {
      throw new apiError(400, "Student ID is required");
    }
    if (!assignmentId) {
      throw new apiError(400, "Assignment ID is required");
    }

    // ---------------- Find Enrollment and Assignment ----------------
    const enrollment = await Enrollment.findOne(
      { student_id, "assignments.assignment_id": assignmentId },
      { "assignments.$": 1 } // Project only the matched assignment
    ).lean();

    if (!enrollment || !enrollment.assignments || enrollment.assignments.length === 0) {
      throw new apiError(404, "Enrollment or Assignment not found for this student");
    }

    const assignmentEntry = enrollment.assignments[0];
    const submittedDocuments = assignmentEntry.submittedDocuments || [];

    // ---------------- Optional: Include Assignment Info ----------------
    const assignment = await Assignment.findById(assignmentId)
      .select("title description submissionDate mark assignmentCode attachment subject_id")
      .lean();

    if (!assignment) {
      throw new apiError(404, "Assignment not found");
    }

    const response = {
      assignment_id: assignment._id,
      title: assignment.title,
      description: assignment.description,
      submissionDate: assignment.submissionDate,
      mark: assignment.mark,
      paper: assignment.attachment,
      assignmentCode: assignment.assignmentCode,
      subject_id: assignment.subject_id,
      submittedDocuments,
    };

    // ---------------- Return Success ----------------
    return res.status(200).json({
      status: 200,
      data: response,
      message: "Submitted documents retrieved successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      data: null,
      message: "Server error: " + error.message,
    });
  }
});



