import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";
import deleteLocalFiles from "../../utils/deleteLocalFiles.js";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
// Model Import
import Student from "../../models/student.model.js";
import Guardian from "../../models/guardian.model.js";
import Teacher from "../../models/teacher.model.js";
import Staff from "../../models/staff.model.js";


// 🔹 Student ScholarShip Update
export const updateStudentScholarShip = asyncHandler(async (req, res) => {
  try {
    const { scholarShip, student_id } = req.body;
    const teacher_id = req.user._id; // Get the teacher ID from the authenticated user

    // validate studentId
    if (!student_id) {
      throw new apiError(400, "Student ID is required to update scholarship");
    }

    if (!options.isValidObjectId(student_id)) {
      throw new apiError(400, "Invalid student ID format");
    }

    // Validate required field
    if (!scholarShip) {
      throw new apiError(400, "Please provide all required fields");
    }

    if (typeof scholarShip !== "number") {
      throw new apiError(400, "Scholarship must be a number");
    }

    if (scholarShip < 0 || scholarShip > 100) {
      throw new apiError(400, "Scholarship must be between 0 and 100");
    }

    if (!teacher_id) {
      throw new apiError(400, "Teacher ID is required to update scholarship");
    }

    if (!options.isValidObjectId(teacher_id)) {
      throw new apiError(400, "Invalid teacher ID format");
    }

    // Check the teacher is Principal or not
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    if (teacher.role !== "Principal") {
      throw new apiError(
        403,
        "Only the Principal can update student scholarship"
      );
    }

    // Update student scholarship
    const updatedStudent = await Student.findByIdAndUpdate(
      student_id,
      { $set: { scholarShip: scholarShipNum } },
      { new: true, select: "scholarShip" },
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(
        new apiResponse(200, updatedStudent, "Student scholarShip updated"),
      );
  } catch (error) {
    console.error("Update Student Scholarship Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Request for Student ScholarShip Update
export const requestForScholarshipUpdate = asyncHandler(async (req, res) => {
  try {
    const { student_id, requestedScholarshipNum } = req.body;
    const technician_id = req.user._id; // Get the technician ID from the authenticated user

    // validate studentId
    if (!student_id) {
      throw new apiError(400, "Student ID is required to request scholarship update");
    }

    if (!options.isValidObjectId(student_id)) {
      throw new apiError(400, "Invalid student ID format");
    }

    // Validate required field
    if (!requestedScholarshipNum) {
      throw new apiError(400, "Please provide all required fields");
    }

    if (typeof requestedScholarshipNum !== "number") {
      throw new apiError(400, "Requested scholarship must be a number");
    }

    if (requestedScholarshipNum < 0 || requestedScholarshipNum > 100) {
      throw new apiError(400, "Requested scholarship must be between 0 and 100");
    }
    
    if (!technician_id) {
      throw new apiError(400, "Technician ID is required to request scholarship update");
    }

    if (!options.isValidObjectId(technician_id)) {
      throw new apiError(400, "Invalid technician ID format");
    }

    // Check the technician is a staff member or not
    const staffMember = await staff.findById(technician_id);
    if (!staffMember) {
      throw new apiError(404, "Staff member not found");
    }

    if (staffMember.role !== "Technician") {
      throw new apiError(
        403,
        "Only a Technician can request for student scholarship update"
      );
    }

    // Update student requested scholarship
    const updatedStudent = await Student.findByIdAndUpdate(
      student_id,
      { $set: {  scholarShip: requestedScholarshipNum } },
      { new: true, select: "scholarShip" },
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(
        new apiResponse(200, updatedStudent, "Scholarship update request submitted"),
      );
  } catch (error) {
    console.error("Request Scholarship Update Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Add New Guardian
export const addNewGuardian = asyncHandler(async (req, res) => {
  try {
    const { firstName, middleName,relationshipWithGuardian,gender,phoneNumber,address } = req.body;
    const prefixName = req.body?.prefixName 
    const lastName = req.body?.lastName
    const mail = req.body?.mail 
    const pic = req.files?.pic?.[0]?.path; // Optional profile picture
    const employee  = req.body?.employee // Optional isStaff field for staff members

    let student_id = null 

    const accountType = req.user.accountType;

    if(employee) {
        let existingEmployee = null;
        // Check if the user is a staff member
        if (employee === "staff") {
         existingEmployee = await Staff.find({phoneNumber}); 
        }
        if(employee === "teacher") {
          existingEmployee = await Teacher.find({phoneNumber}); 
        }
        if(!existingEmployee ) {
          throw new apiError(400, "No Employee found with this phone number");
        }

        res.status(200).json( new apiResponse(200, existingEmployee, "Employee found with this phone number") );
        return; // Exit the function after sending the response
        
    }

    const existingGuardian = await Guardian.findOne({ phoneNumber });
    if (existingGuardian) {
      res.status(200).json( new apiResponse(200, existingGuardian, "Guardian already exists with this phone number") );
      return; // Exit the function after sending the response
    }

    if (accountType === "student") {
      student_id = req.user._id; // Get the student ID from the authenticated user
    } else if (accountType === "teacher" || accountType === "staff") {
      student_id = req.body.student_id; // Get the student ID from the request body for teachers and staff
    } else {
      throw new apiError(403, "Unauthorized to add a guardian");
    }


    // validate studentId
    if (!student_id) {
      throw new apiError(400, "Student ID is required to add a new guardian");
    }

    // Validate required field
    if (!firstName || !middleName || !gender || !phoneNumber || !address || !mail ) {
      throw new apiError(400, "Please provide all required fields");
    }

    // Validate phone number
    if (!/^\d{11}$/.test(phoneNumber)) {
      throw new apiError(400, "Phone number must be exactly 11 digits");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( mail && !emailRegex.test(mail)) {
      throw new apiError(400, "Invalid email format");
    }

    //check gender value
    if (!["male", "female", "other"].includes(gender)) {
      throw new apiError(400, "Invalid gender value");
    }

    //check address length
    if (address.length < 5 || address.length > 200) {
      throw new apiError(400, "Address must be between 5 and 200 characters");
    }

    const existingStudent = await Student.findById(student_id).select("guardian studentId");
    if (!existingStudent) {
      throw new apiError(404, "Student not found");
    }

    // check if the student already has a guardian
    if (existingStudent.guardian) {
      throw new apiError(400, "This student already has a guardian");
    }

    // check pic file type if provided
    if (pic) {
      // Validate picture file type
      if (!/^.*\.(png|jpg|jpeg|webp)$/i.test(pic)) {
        await deleteLocalFiles(req.files); // Clean up uploaded file if validation fails
        throw new apiError(
          400,
          "Profile picture must be PNG, JPG, JPEG, or WEBP",
        );
      }
      // Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(pic);
      await deleteLocalFiles(req.files); // Clean up uploaded file if validation fails
      if (!uploadResult?.secure_url) {
        throw new apiError(500, "Failed to upload profile picture");
      }
      req.body.pic = uploadResult.secure_url; // Store the Cloudinary URL in the request body

    }

    

    // making GuardianId 

    const guardianId = `${existingStudent.studentId}3`;

    // prepare guardian data
    const guardianData = {
      guardianId,
      firstName,
      middleName,
      prefixName: prefixName || null,
      lastName: lastName || null,
      gender,
      phoneNumber,
      address,
      mail,
      pic: req.body.pic || null, // Use the Cloudinary URL if available, otherwise null
    };

    // Create a new guardian document
    const newGuardian = await Guardian.create(guardianData);

    if (!newGuardian) {
      throw new apiError(500, "Failed to create a new guardian");
    }

    res
      .status(201)
      .json(
        new apiResponse(
          201,
          { guardian: newGuardian },
          "New guardian added successfully",
        ),
      );
  } catch (error) {
    console.error("Add New Guardian Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// later we will check for sms 
export const linkGuardianToStudent = asyncHandler(async (req, res) => {
  try {
    const { guardian_id,relationshipWithGuardian } = req.body;
    const employee  = req.body?.employee // Optional isStaff field for staff members
    const accountType = req.user.accountType;
    let student_id = null

    if(accountType === "student") { 
        student_id = req.user._id; // Get the student ID from the authenticated user
    } else if (accountType === "teacher" || accountType === "staff") {
        student_id = req.body.student_id; // Get the student ID from the request body for teachers and staff
    } else {
        throw new apiError(403, "Unauthorized to link a guardian to a student");
    }

    // Validate required fields
    if (!student_id || !guardian_id || !relationshipWithGuardian) {
      throw new apiError(400, "Please provide both student ID and guardian ID");
    }

    // Validate ObjectId format
    if (!options.isValidObjectId(student_id) || !options.isValidObjectId(guardian_id)) {
      throw new apiError(400, "Invalid student or guardian ID format");
    }

    // check relationshipWithGuardian value  

    if (!["uncle", "auntie", "sister", "brother", "grandfather", "grandmother", "other"].includes(relationshipWithGuardian)) {
      throw new apiError(400, "Invalid relationship with guardian value");
    }

    // Check if the student exists
    const existingStudent = await Student.findById(student_id).select("guardian");
    if (!existingStudent) {
      throw new apiError(404, "Student not found");
    }

    if (existingStudent.guardian) {
      throw new apiError(400, "This student already has a guardian linked");
    }

    // Check if the guardian exists
    let existingGuardian = null;
    if(employee) {
        // Check if the user is a staff member
        if (employee === "staff") {
         existingGuardian = await Staff.findByIdAndUpdate(guardian_id,{push : {children : student_id}} ,{ new: true, select: "children" }); 
        }
        if(employee === "teacher") {
          existingGuardian = await Teacher.findByIdAndUpdate(guardian_id,{push : {children : student_id}} ,{ new: true, select: "children" }); 
        }
    } else {
    existingGuardian = await Guardian.findByIdAndUpdate(guardian_id,{push : {children : student_id}} ,{ new: true, select: "children" }); 
    }
    if (!existingGuardian) {
      throw new apiError(404, "Guardian not found");
    }

    // prepare the update data for the student
    const updateData = {
      guardian: guardian_id,
      guardianModel: employee ? (employee === "staff" ? "Staff" : "Teacher") : "Guardian",
      relationshipWithGuardian,
    };

    // Link the guardian to the student
    const updatedStudent = await Student.findByIdAndUpdate(
      student_id,
      { $set: updateData },
      { new: true, select: "guardian guardianModel relationshipWithGuardian" },
    );

    if (!updatedStudent) {
      throw new apiError(404, "Something went wrong while linking the guardian to the student");
    }

    res
      .status(212)
      .json(
        new apiResponse(
          212,
          { student: updatedStudent },
          "Guardian linked to student successfully",
        ),
      );
  } catch (error) {
    console.error("Link Guardian to Student Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});


// if the guardian is linked to the student then we can unlink the guardian from the student if the student created the guardian then he will delete the guardian from the database and if the teacher or staff created the guardian then he will unlink the guardian from the student but he will not delete the guardian from the database because the guardian can be linked to another student also.
// this one is dummy function for now we will implement it later when we will implement the guardian model and guardian controller
export const unlinkGuardianFromStudent = asyncHandler(async (req, res) => {
  try {
    const { student_id } = req.body;
    const accountType = req.user.accountType;

    let studentIdToUnlink = null;

    if (accountType === "student") {
      studentIdToUnlink = req.user._id; // Get the student ID from the authenticated user
    } else if (accountType === "teacher" || accountType === "staff") {
      studentIdToUnlink = req.body.student_id; // Get the student ID from the request body for teachers and staff
    } else {
      throw new apiError(403, "Unauthorized to unlink a guardian from a student");
    }

    // Validate required field
    if (!studentIdToUnlink) {
      throw new apiError(400, "Student ID is required to unlink a guardian");
    }

    // Validate ObjectId format
    if (!options.isValidObjectId(studentIdToUnlink)) {
      throw new apiError(400, "Invalid student ID format");
    }

    // Check if the student exists
    const existingStudent = await Student.findById(studentIdToUnlink).select("guardian");
    if (!existingStudent) {
      throw new apiError(404, "Student not found");
    }

    if (!existingStudent.guardian) {
      throw new apiError(400, "This student does not have a guardian linked");
    }

    // Unlink the guardian from the student
    const updatedStudent = await Student.findByIdAndUpdate(
      studentIdToUnlink,
      { $unset: { guardian: "", guardianModel: "", relationshipWithGuardian: "" } },
      { new: true, select: "guardian guardianModel relationshipWithGuardian" },
    );

    if (!updatedStudent) {
      throw new apiError(404, "Something went wrong while unlinking the guardian from the student");
    }

    res
      .status(212)
      .json(
        new apiResponse(
          212,
          { student: updatedStudent },
          "Guardian unlinked from student successfully",
        ),
      );
  } catch (error) {
    console.error("Unlink Guardian from Student Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});


// Delete Guardian Account --- dummy function for now we will implement it later when we will implement the guardian model and guardian controller
export const deleteGuardianAccountByStudent  = asyncHandler(async (req, res) => {
  try {
    const { guardian_id } = req.body;
    const accountType = req.user.accountType;

    if (accountType !== "teacher" && accountType !== "staff") {
      throw new apiError(403, "Unauthorized to delete a guardian");
    }

    // Validate required field
    if (!guardian_id) {
      throw new apiError(400, "Guardian ID is required to delete a guardian");
    }

    // Validate ObjectId format
    if (!options.isValidObjectId(guardian_id)) {
      throw new apiError(400, "Invalid guardian ID format");
    }

    // Check if the guardian exists
    const existingGuardian = await Guardian.findById(guardian_id);
    if (!existingGuardian) {
      throw new apiError(404, "Guardian not found");
    }

    // Delete the guardian from the database
    await Guardian.findByIdAndDelete(guardian_id);

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          null,
          "Guardian deleted successfully",
        ),
      );
  } catch (error) {
    console.error("Delete Guardian Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});









