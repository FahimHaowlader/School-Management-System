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

// 🔹 Student Profile Retrieval
export const getStudentProfile = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user._id;

    // validate student_id
    if (!student_id) {
      throw new apiError(400, "Student ID is required to get profile");
    }

    if (!options.isValidObjectId(student_id)) {
      throw new apiError(400, "Invalid student ID format");
    }

    const student = await Student.findById(studentId)
      .select(
        "name rollNumber mother motherModel father fatherModel guardian guardianModel relationshipWithGuardian emergencyContact",
      )
      .populate({ path: "mother", select: "firstName lastName phone email" })
      .populate({ path: "father", select: "firstName lastName phone email" })
      .populate({ path: "guardian", select: "firstName lastName phone email" })
      .lean(); // Converts Mongoose Document to plain JS Object so we can modify it

    if (!student) {
      throw new apiError(404, "Student not found");
    }

    // 2. If guardian is null, delete the empty guardian tracking keys from the response
    if (studentData.guardian === null) {
      delete student.guardian;
      delete student.guardianModel;
      delete student.relationshipWithGuardian;
    }

    res
      .status(200)
      .json(new apiResponse(200, student, "Student profile retrieved"));
  } catch (error) {
    console.error("Get Student Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Student Presonal information Update
export const updateStudentPersonalInformation = asyncHandler(
  async (req, res) => {
    try {
      const student_id = req.user._id;

      const {
        firstName,
        middleName,
        prefixName,
        lastName,
        dateOfBirth,
        gender,
        bloodGroup,
      } = req.body;

      // Validate student_id
      if (!student_id) {
        throw new apiError(
          400,
          "Student ID is required to update personal information",
        );
      }

      // Validate required fields
      if (!firstName || !middleName || !dateOfBirth || !gender) {
        throw new apiError(400, "Please provide all required fields");
      }

      // validate firstName
      if (!/^[A-Za-z]{2,15}$/.test(firstName)) {
        throw new apiError(400, "Invalid first name format");
      }

      // validate middleName
      if (!/^[A-Za-z]{2,15}$/.test(middleName)) {
        throw new apiError(400, "Invalid middle name format");
      }

      // validate lastName
      if (lastName && !/^[A-Za-z]{2,15}$/.test(lastName)) {
        throw new apiError(400, "Invalid last name format");
      }

      // validate prefixName
      if (prefixName && !/^[a-z.,:!\-?/()\s]{1,10}$/.test(prefixName)) {
        throw new apiError(400, "Invalid prefix name format");
      }

      const dob = new Date(dateOfBirth);
      if (isNaN(dob.getTime())) {
        throw new apiError(400, "Invalid date of birth format");
      }

      if (
        bloodGroup &&
        !["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"].includes(bloodGroup)
      ) {
        throw new apiError(400, "Invalid blood group value");
      }

      // Prepare update object
      const updateData = {
        firstName,
        middleName,
        dateOfBirth,
        gender,
      };
      if (prefixName) updateData.prefixName = prefixName;
      if (lastName) updateData.lastName = lastName;
      if (bloodGroup) updateData.bloodGroup = bloodGroup.toLowerCase();

      // Update student in one DB operation
      const updatedStudent = await Student.findByIdAndUpdate(
        student_id,
        { $set: updateData },
        { new: true, runValidators: true },
      );

      if (!updatedStudent) throw new apiError(404, "Student not found");

      res
        .status(200)
        .json(new apiResponse(200, updatedStudent, "Student profile updated"));
    } catch (error) {
      console.error("Update Student Personal Information Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// 🔹 Student Contact information Update
export const updateStudentContactInformation = asyncHandler(
  async (req, res) => {
    try {
      const studentId = req.user._id;
      const { address, phoneNumber, mail } = req.body;

      // validate studentId
      if (!studentId) {
        throw new apiError(
          400,
          "Student ID is required to update contact information",
        );
      }

      // Validate required fields
      if (!address || !phoneNumber || !mail) {
        throw new apiError(400, "Please provide all required fields");
      }

      // Validate address
      if (address.length < 5 || address.length > 200) {
        throw new apiError(400, "Address must be between 5 and 200 characters");
      }

      // Validate phone number
      if (!/^\d{11}$/.test(phoneNumber)) {
        throw new apiError(400, "Phone number must be exactly 11 digits");
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(mail)) {
        throw new apiError(400, "Invalid email format");
      }

      // Prepare update object
      const updateData = {
        address,
        phoneNumber,
      };

      // Update student in one DB operation
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $set: updateData },
        { new: true, runValidators: true },
      );

      if (!updatedStudent) throw new apiError(404, "Student not found");

      res
        .status(200)
        .json(
          new apiResponse(
            200,
            updatedStudent,
            "Student contact information updated",
          ),
        );
    } catch (error) {
      console.error("Update Student Contact Information Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// 🔹 Student Profile Picture Update
export const updateStudentProfilePicture = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user._id;

    // validate studentId
    if (!student_id) {
      throw new apiError(
        400,
        "Student ID is required to update profile picture",
      );
    }

    // Validate picture file
    const pictureLocalPath = await req.files?.picture?.[0]?.path;
    if (
      !pictureLocalPath ||
      !/^.*\.(png|jpg|jpeg|webp)$/i.test(pictureLocalPath)
    ) {
      await deleteLocalFiles(req.files); // Clean up uploaded file if validation fails
      throw new apiError(
        400,
        "Profile picture is required and must be PNG, JPG, JPEG, or WEBP",
      );
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(pictureLocalPath);
    await deleteLocalFiles(req.files); // Clean up uploaded file if validation fails
    if (!uploadResult?.secure_url) {
      throw new apiError(500, "Failed to upload profile picture");
    }

    const pictureOnlinePath = uploadResult.secure_url;

    // Update student's profile picture
    const oldStudent = await Student.findByIdAndUpdate(
      student_id,
      { $set: { pic: pictureOnlinePath } },
      { new: false, select: "pic" },
    );

    if (!oldStudent) {
      await deleteFromCloudinary(pictureOnlinePath); // Clean up newly uploaded picture if student not found
      throw new apiError(404, "Student not found");
    }

    // If there was an old profile picture, delete it from Cloudinary
    if (oldStudent.pic) {
      await deleteFromCloudinary(oldStudent.pic);
    }

    const updatedStudent = { ...oldStudent.toObject(), pic: pictureOnlinePath }; // Merge old student data with new pic URL

    res
      .status(200)
      .json(
        new apiResponse(200, updatedStudent, "Student profile picture updated"),
      );
  } catch (error) {
    console.error("Update Student Profile Picture Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// update emergency contact
export const requestToUpdateEmergencyContact = asyncHandler(async (req, res) => {
  try {
    const { emergencyContact, student_id } = req.body;

    // validate studentId
    if (!student_id) {
      throw new apiError(
        400,
        "Student ID is required to update emergency contact",
      );
    }

    // Validate required field
    if (!emergencyContact) {
      throw new apiError(400, "Please provide all required fields");
    }

    // Validate emergency contact value
    if (!["mother", "father", "guardian"].includes(emergencyContact)) {
      throw new apiError(400, "Invalid emergency contact value");
    }

    // Update student emergency contact
    const updatedStudent = await Student.findByIdAndUpdate(
      student_id,
      { $set: { emergencyContact } },
      { new: true, select: "emergencyContact", runValidators: true },
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          updatedStudent,
          "Student emergency contact updated",
        ),
      );
  } catch (error) {
    console.error("Update Student Emergency Contact Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// ================= END OF STUDENT PROFILE CONTROLLERS =================
