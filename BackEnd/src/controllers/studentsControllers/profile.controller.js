import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";

// Model Import
import Student from "../../models/student.model.js";

// 🔹 Student Profile Retrieval
export const getStudentProfile = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user._id;

    // validate student_id
    if (!student_id) {
      throw new apiError(400, "Student ID is required to get profile");
    }

    const student = await Student.findById(student_id).select(
      "-password -refreshToken"
    );

    if (!student) {
      throw new apiError(404, "Student not found");
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
        throw new apiError(400, "Student ID is required to update personal information");
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
        { new: true, runValidators: true }
      );

      if (!updatedStudent) throw new apiError(404, "Student not found");

      res.status(200).json(new apiResponse(200, updatedStudent, "Student profile updated"));
    } catch (error) {
      console.error("Update Student Personal Information Error:", error);

      if (error instanceof apiError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// 🔹 Student Contact information Update
export const updateStudentContactInformation = asyncHandler(async (req, res) => {
  try {
    const studentId = req.user._id;
    const { address, phoneNumber } = req.body;

    // validate studentId
    if (!studentId) {
      throw new apiError(400, "Student ID is required to update contact information");
    }

    // Validate required fields
    if (!address || !phoneNumber) {
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

    // Prepare update object
    const updateData = {
      address,
      phoneNumber,
    };

    // Update student in one DB operation
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(new apiResponse(200, updatedStudent, "Student contact information updated"));
  } catch (error) {
    console.error("Update Student Contact Information Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Student Profile Picture Update
export const updateStudentProfilePicture = asyncHandler(async (req, res) => {
  try {
    const studentId = req.user._id;

    // validate studentId
    if (!studentId) {
      throw new apiError(400, "Student ID is required to update profile picture");
    }

    // Validate picture file
    const pictureLocalPath = await req.files?.picture?.[0]?.path;
    if (!pictureLocalPath || !/^.*\.(png|jpg|jpeg|webp)$/i.test(pictureLocalPath)) {
      throw new apiError(
        400,
        "Profile picture is required and must be PNG, JPG, JPEG, or WEBP"
      );
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(pictureLocalPath);
    if (!uploadResult?.secure_url) {
      throw new apiError(500, "Failed to upload profile picture");
    }

    const pictureOnlinePath = uploadResult.secure_url;

    // Update student's profile picture
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: { pic: pictureOnlinePath } },
      { new: true, select: "-password" }
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(new apiResponse(200, updatedStudent, "Student profile picture updated"));
  } catch (error) {
    console.error("Update Student Profile Picture Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Student ScholarShip Update
export const updateStudentScholarShip = asyncHandler(async (req, res) => {
  try {
    const studentId = req.user._id;
    const { scholarShip } = req.body;

    // validate studentId
    if (!studentId) {
      throw new apiError(400, "Student ID is required to update scholarship");
    }

    // Validate required field
    if (!scholarShip) {
      throw new apiError(400, "Please provide all required fields");
    }

    // Validate scholarship value
    const scholarShipNum = Number(scholarShip);
    if (isNaN(scholarShipNum) || scholarShipNum < 0 || scholarShipNum > 100) {
      throw new apiError(400, "Invalid scholarShip amount");
    }

    // Update student scholarship
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: { scholarShip: scholarShipNum } },
      { new: true, select: "-password" }
    );

    if (!updatedStudent) throw new apiError(404, "Student not found");

    res
      .status(200)
      .json(new apiResponse(200, updatedStudent, "Student scholarShip updated"));
  } catch (error) {
    console.error("Update Student Scholarship Error:", error);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});



// ================= END OF STUDENT PROFILE CONTROLLERS =================



