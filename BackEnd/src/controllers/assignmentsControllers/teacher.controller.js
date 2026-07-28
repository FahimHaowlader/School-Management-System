import apiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";


// Model Import

import Enrollment from "../../models/enrollment.model.js";
import  Student  from "../../models/student.model.js";
import Assignment from "../../models/assignment.model.js";
import Teacher from "../../models/teacher.model.js";


// get all assigmnets count by teacher for specific year
export const getAssignmentsCountByTeacherAndYear = asyncHandler(async (req, res) => {
  try {
    const { year } = req.query;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!year) {
      return next(new apiError("Year query parameter is required", 400));
    }

    const assignmentsCount = await Assignment.countDocuments({ teacherId, year });

    res.status(200).json(apiResponse(true, "Assignments count retrieved successfully", { count: assignmentsCount }));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});
// get all assignments by teacher for sepecific year
export const getAssignmentsByTeacherAndYear = asyncHandler(async (req, res) => {
  try {
    const { year } = req.query;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!year) {
      return next(new apiError("Year query parameter is required", 400));
    }

    const assignments = await Assignment.find({ teacherId, year })
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("teacherId", "name") // Populate teacher name
      .lean();

    if (!assignments || assignments.length === 0) {
      return next(new apiError("No assignments found for the specified year", 404));
    }

    res.status(200).json(apiResponse(true, "Assignments retrieved successfully", assignments));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// get all assignments by teacher for specific class and subject and year
export const getAssignmentsByTeacherClassSubjectAndYear = asyncHandler(async (req, res) => {
  try {
    const { year, classId, subjectId } = req.query;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!year || !classId || !subjectId) {
      return next(new apiError("Year, Class ID, and Subject ID query parameters are required", 400));
    }

    const assignments = await Assignment.find({ teacherId, year, classId, subjectId })
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("teacherId", "name") // Populate teacher name
      .lean();

    if (!assignments || assignments.length === 0) {
      return next(new apiError("No assignments found for the specified criteria", 404));
    }

    res.status(200).json(apiResponse(true, "Assignments retrieved successfully", assignments));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});


// search assignments by title for specific teacher and year and class and subject
export const searchAssignmentsByTitle = asyncHandler(async (req, res) => {
  try {
    const { year, classId, subjectId, title } = req.query;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!year || !classId || !subjectId || !title) {
      return next(new apiError("Year, Class ID, Subject ID, and Title query parameters are required", 400));
    }

    const assignments = await Assignment.find({
      teacherId,
      year,
      classId,
      subjectId,
      title: { $regex: title, $options: "i" }, // Case-insensitive search
    })
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("teacherId", "name") // Populate teacher name
      .lean();

    if (!assignments || assignments.length === 0) {
      return next(new apiError("No assignments found matching the specified criteria", 404));
    }

    res.status(200).json(apiResponse(true, "Assignments retrieved successfully", assignments));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// get details of a specific assignment by teacher
export const getAssignmentDetailsByTeacher = asyncHandler(async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user

    if (!assignmentId) {
      return next(new apiError("Assignment ID parameter is required", 400));
    }

    const assignment = await Assignment.findOne({ _id: assignmentId, teacherId })
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("teacherId", "name") // Populate teacher name
      .lean();

    if (!assignment) {
      return next(new apiError("Assignment not found for the specified teacher", 404));
    }

    res.status(200).json(apiResponse(true, "Assignment details retrieved successfully", assignment));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// update assignment details by teacher
export const updateAssignmentByTeacher = asyncHandler(async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const teacherId = req.user._id; // Assuming the teacher's ID is available in req.user
    const updateData = req.body;

    if (!assignmentId) {
      return next(new apiError("Assignment ID parameter is required", 400));
    }

    const updatedAssignment = await Assignment.findOneAndUpdate(
      { _id: assignmentId, teacherId },
      updateData,
      { new: true }
    )
      .populate("classId", "name") // Populate class name
      .populate("subjectId", "name") // Populate subject name
      .populate("teacherId", "name") // Populate teacher name
      .lean();

    if (!updatedAssignment) {
      return next(new apiError("Assignment not found or not authorized to update", 404));
    }

    res.status(200).json(apiResponse(true, "Assignment updated successfully", updatedAssignment));
  } catch (error) {
    next(new apiError(error.message, 500));
  }
});

// get assignments grade for specific assignment by teacher
export const getAssignmentGradesByTeacher = asyncHandler(async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        const teacherId = req.user._id;

        if (!assignmentId) {
            return next(new apiError("Assignment ID parameter is required", 400));
        }

        // 1. Verify the assignment exists and belongs to this teacher
        const assignment = await Assignment.findOne({
            _id: assignmentId,
            teacher: teacherId
        });

        if (!assignment) {
            return next(new apiError("Assignment not found or unauthorized access", 404));
        }

        // 2. Fetch all student submissions/grades for this assignment
        const grades = await Submission.find({ assignment: assignmentId })
            .populate("student", "name email rollNumber") // populate student details
            .select("student grade feedback submittedAt status");

        // 3. Return response
        return res.status(200).json({
            success: true,
            count: grades.length,
            data: grades
        });
    } catch (error) {
        return next(new apiError(error.message || "Failed to retrieve assignment grades", 500));
    }
});

// grade assignment by teacher
export const gradeAssignmentByTeacher = asyncHandler(async (req, res, next) => {
    try {
        const { assignmentId, studentId } = req.params;
        const { grade, feedback } = req.body;
        const teacherId = req.user._id;

        if (!assignmentId || !studentId) {
            return next(new apiError("Assignment ID and Student ID parameters are required", 400));
        }

        // 1. Verify the assignment exists and belongs to this teacher
        const assignment = await Assignment.findOne({
            _id: assignmentId,
            teacher: teacherId
        });

        if (!assignment) {
            return next(new apiError("Assignment not found or unauthorized access", 404));
        }

        // 2. Find the student's submission for this assignment
        let submission = await Submission.findOne({
            assignment: assignmentId,
            student: studentId
        });

        if (!submission) {
            // If no submission exists, create a new one with the grade and feedback
            submission = new Submission({
                assignment: assignmentId,
                student: studentId,
                grade,
                feedback,
                status: "graded"
            });
        } else {
            // Update existing submission with new grade and feedback
            submission.grade = grade !== undefined ? grade : submission.grade;
            submission.feedback = feedback !== undefined ? feedback : submission.feedback;
            submission.status = "graded";
            submission.gradedAt = new Date();
        }

        // 3. Save the submission
        await submission.save();

        // 4. Populate student details for UI consistency
        await submission.populate("student", "name email rollNumber");

        // 5. Return response
        return res.status(200).json({
            success: true,
            message: "Assignment graded successfully",
            data: submission
        });
    } catch (error) {
        return next(new apiError(error.message || "Failed to grade assignment", 500));
    }
});


// update assignment grade for specific student by teacher
export const updateAssignmentGradeByTeacher = asyncHandler(async (req, res, next) => {
    try {
        const { assignmentId, studentId } = req.params;
        const { grade, feedback } = req.body;
        const teacherId = req.user._id;

        if (!assignmentId || !studentId) {
            return next(new apiError("Assignment ID and Student ID parameters are required", 400));
        }

        // 1. Verify the assignment exists and belongs to this teacher
        const assignment = await Assignment.findOne({
            _id: assignmentId,
            teacher: teacherId
        });

        if (!assignment) {
            return next(new apiError("Assignment not found or unauthorized access", 404));
        }

        // 2. Find the student's submission for this assignment
        const submission = await Submission.findOne({
            assignment: assignmentId,
            student: studentId
        });

        if (!submission) {
            return next(new apiError("Student submission not found for this assignment", 404));
        }

        // 3. Update the grade and feedback
        submission.grade = grade;
        submission.feedback = feedback;
        await submission.save();

        // 4. Return response
        return res.status(200).json({
            success: true,
            message: "Grade updated successfully",
            data: submission
        });
    } catch (error) {
        return next(new apiError(error.message || "Failed to update assignment grade", 500));
    }
});

// delete assignment by teacher
export const deleteAssignmentByTeacher = asyncHandler(async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        const teacherId = req.user._id;

        if (!assignmentId) {
            return next(new apiError("Assignment ID parameter is required", 400));
        }

        // 1. Verify the assignment exists and belongs to this teacher
        const assignment = await Assignment.findOne({
            _id: assignmentId,
            teacher: teacherId
        });

        if (!assignment) {
            return next(new apiError("Assignment not found or unauthorized access", 404));
        }

        // 2. Delete the assignment
        await Assignment.deleteOne({ _id: assignmentId });

        // 3. Optionally, delete all related submissions for this assignment
        await Submission.deleteMany({ assignment: assignmentId });

        // 4. Return response
        return res.status(200).json({
            success: true,
            message: "Assignment and related submissions deleted successfully"
        });
    } catch (error) {
        return next(new apiError(error.message || "Failed to delete assignment", 500));
    }
});

