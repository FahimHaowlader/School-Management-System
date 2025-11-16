import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";

// modules
import Student from "../../models/student.model.js";
import Entrollment from "../../models/enrollment.model.js";
import Class from "../../models/class.model.js";
import Guardian from "../../models/guardian.model.js";

// 🔹 Student  Controller

// Student Registration
export const studentRegistration = asyncHandler(async (req, res) => {
  try {
    const {
      password,
      firstName,
      middleName,
      dateOfBirth,
      prefixName,
      lastName,
      address,
      phoneNumber,
      scholarship,
      gender,
      admittedAt,
      bloodGroup,
      classNO,
      mother_id,
      father_id,
      guardian_id,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      password,
      classNO,
      mother_id,
      father_id,
      firstName,
      middleName,
      dateOfBirth,
      address,
      phoneNumber,
      gender,
      admittedAt,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        throw new apiError(400, `${key} is required`);
      }
    }

    // Validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new apiError(
        400,
        "Password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
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

    // validate address
    if (address.length < 5 || address.length > 200) {
      throw new apiError(400, "Address must be between 5 and 200 characters");
    }

    // validate pic

    const pictureLocalPath = req.files?.picture?.[0]?.path || null;

    if (
      !pictureLocalPath ||
      !/^.*\.(png|jpg|jpeg|webp)$/i.test(pictureLocalPath)
    ) {
      throw new apiError(
        400,
        "Profile picture is required and must be PNG, JPG, JPEG, or WEBP"
      );
    }
    // upload to cloudinary

    const uploadResult = await uploadToCloudinary(pictureLocalPath);

    if (!uploadResult || !uploadResult.secure_url) {
      throw new apiError(500, "Failed to upload profile picture");
    }

    const pictureOnlinePath = uploadResult.secure_url;

    // validate gender
    if (!["male", "female", "other"].includes(gender)) {
      throw new apiError(400, "Invalid gender value");
    }

    // validate admittedAt
    const admittedDate = new Date(admittedAt);
    if (isNaN(admittedDate.getTime())) {
      throw new apiError(400, "Invalid admission date format");
    }

    // validate bloodGroup
    if (
      bloodGroup &&
      !["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"].includes(bloodGroup)
    ) {
      throw new apiError(400, "Invalid blood group value");
    }

    // validate scholarship
    if (scholarship && (isNaN(scholarship) || scholarship < 0)) {
      throw new apiError(400, "Invalid scholarship amount");
    }

    // vlidate dateOfBirth
    const dob = new Date(dateOfBirth);
    if (isNaN(dob.getTime())) {
      throw new apiError(400, "Invalid date of birth format");
    }

    // validate phoneNumber
    if (!/^\d{11}$/.test(phoneNumber)) {
      throw new apiError(400, "Phone number must be exactly 11 digits");
    }

    // validate classNO
    if (!/^(?:[1-9]|1[0-2])$/.test(classNO)) {
      throw new apiError(400, "Class number must be between 1 and 12");
    }

    // find mother from guardian collection
    const mother = await Guardian.findById(mother_id);
    if (!mother) {
      throw new apiError(404, "Mother guardian not found");
    }

    // find father from guardian collection
    const father = await Guardian.findById(father_id);
    if (!father) {
      throw new apiError(404, "Father guardian not found");
    }

    // find guardian from guardian collection if provided
    let guardian = null;
    if (guardian_id) {
      guardian = await Guardian.findById(guardian_id);
      if (!guardian) {
        throw new apiError(404, "Guardian not found");
      }
    }

    // Check if class exists

    const classExists = await Class.findOne({
      $and: [{ class: classNO }, { year: new Date().getFullYear() }],
    });
    if (!classExists) {
      throw new apiError(404, "Class does not exist");
    }

    // Check for existing student with same firstName, middleName, and dateOfBirth
    const studentExists = await Student.findOne({
      $and: [{ firstName }, { middleName }, { dateOfBirth: dob }],
    });

    if (studentExists) {
      throw new apiError(
        409,
        "Student with the same name and date of birth already exists"
      );
    }

    // Create new student
    const student = new Student({
      password,
      firstName,
      middleName,
      dateOfBirth: dob,
      prefixName,
      lastName,
      bloodGroup: bloodGroup ? bloodGroup : null,
      address,
      phoneNumber,
      mother: mother._id,
      father: father._id,
      guardian: guardian ? guardian._id : null,
      pic: pictureOnlinePath,
      scholarship: scholarship ? scholarship : 0,
      gender,
      admittedAt: admittedDate,
    });

    await student.save();

    // Enroll student in the class
    const enrollment = new Entrollment({
      student_id: student._id,
      class_id: classExists._id,
    });

    await enrollment.save();

    // add enrolled classes to student document
    student.Classes.push(enrollment._id);
    await student.save();

    //  Remove password before sending response
    student.password = undefined;

    // Send response
    res
      .status(200)
      .json(new apiResponse(200,  student , "Student registration endpoint"));
  } catch (error) {
    console.error("Student Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Student Login
export const studentLogin = asyncHandler(async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Validate input
    if (!studentId || !password) {
      throw new apiError(400, "Student ID and password are required");
    }

    // Validate studentId format
    if (!/^[0-9]{9}$/.test(studentId)) {
      throw new apiError(400, "Invalid Student ID format");
    }

   
    // Validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new apiError(
        400, "Password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
    }
    // Check if student exists
    const student = await Student.findOne({ studentId }).select("+password");

    if (!student) {
      throw new apiError(404, "Student does not exist");
    }

    // Check if password is correct
    const isPasswordValid = await student.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid password");
    }

    // Generate tokens
    const accessToken = student.generateAccessToken();
    const refreshToken = student.generateRefreshToken();

    // Save refresh token to database
    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });

    // remove password from response
    student.password = undefined;

    // Send response
    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new apiResponse(200, { accessToken, refreshToken }, "Login successful"));
  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Student Logout
export const studentLogout = asyncHandler(async (req, res) => {
  try {
    const student_id = req.user._id;

    // Find student and remove refresh token
    const student = await Student.findById(student_id);
    if (!student) {
      throw new apiError(404, "Student does not found");
    }

    student.refreshToken = null;
    await student.save({ validateBeforeSave: false });

    // Clear cookies
    res.clearCookie("refreshToken", options);
    res.clearCookie("accessToken", options);

    // Send response
    res.status(200).json(new apiResponse(200, null, "Logout successful"));
  } catch (error) {
    console.error("Student Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Refresh Student Tokens
export const refreshStudentTokens = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new apiError(401, "Refresh token missing");
  }

  // Find the student with matching refresh token
  const student = await Student.findOne({ refreshToken });
  if (!student) {
    throw new apiError(403, "Invalid refresh token");
  }

  // Validate refresh token using method (recommended)
  const isValid = student.validateRefreshToken(refreshToken);
  if (!isValid) {
    throw new apiError(403, "Refresh token expired or invalid");
  }

  // Generate new tokens
  const newAccessToken = student.generateAccessToken();
  const newRefreshToken = student.generateRefreshToken();

  // Save new refresh token
  student.refreshToken = newRefreshToken;
  await student.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, options)
    .cookie("accessToken", newAccessToken, options)
    .json(
      new apiResponse(
        200,
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        "Token refreshed successfully"
      )
    );
});

// Change Student Password
export const changeStudentPassword = asyncHandler(async (req, res) => {
    try {
      const student_id = req.user._id;
      const { currentPassword, newPassword } = req.body;

      // Validate input
      if (!currentPassword || !newPassword) {
        throw new apiError(400, "Current and new passwords are required");
      }

      // Validate new password strength
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
        throw new apiError(
          400,
          "New password must be at least 8 characters, include uppercase, lowercase, and a number"
        );
      }

      // Find student
      const student = await Student.findById(student_id).select("+password");
      if (!student) {
        throw new apiError(404, "Student not found");
      }

      // Check if current password is correct
      const isCurrentPasswordValid = await student.isPasswordCorrect(
        currentPassword
      );
      if (!isCurrentPasswordValid) {
        throw new apiError(401, "Current password is incorrect");
      }

      // Update to new password
      student.password = newPassword;
      await student.save();

      // Send response
      res
        .status(200)
        .json(new apiResponse(200, null, "Password changed successfully"));
    } catch (error) {
      console.error("Change Student Password Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// End of Student Controllers
