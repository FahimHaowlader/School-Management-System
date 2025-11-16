import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";

// Model Import
import Teacher from "../../models/teacher.model.js";

// 🔹 Teacher Registration
export const teacherRegister = asyncHandler(async (req, res) => {
  try {
    const { prefixName, firstName, middleName, lastName, dateOfBirth, bloodGroup, address, phoneNumber, password, gender, emergencyContact, joinedAt, role,  } = req.body;

    // Validate input
    const requiredFields = {
    firstName,
    middleName,
    dateOfBirth,
    address,
    phoneNumber,
    password, 
    gender,
    joinedAt,
    role,
    }

    for (const [key, value] of Object.entries(requiredFields)) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      throw new apiError(400, `${key} is required`);
    }
  }

  // validate Emergency Contact
  if (!emergencyContact || typeof emergencyContact !== "object") {
    throw new apiError(
      400,
      "Emergency contact is required and must be an object"
    );
  }
  if (
    !emergencyContact.name ||
    !emergencyContact.relationship ||
    !emergencyContact.phoneNumber
  ) {
    throw new apiError(
      400,
      "Emergency contact name, relationship and phone number are required"
    );
  }

    // Validate emergency contact name
  if (!/^[a-z\s]{2,30}$/.test(emergencyContact.name)) {
    throw new apiError(
      400,
      "Emergency contact name must be 2-50 characters long and contain only letters and spaces"
    );
  }

  // Validate emergency contact relationship
  if (!/^[a-z\s]{2,15}$/.test(emergencyContact.relationship)) {
    throw new apiError(
      400,
      "Emergency contact relationship must be 2-15 characters long and contain only letters and spaces"
    );
  }

    // validate emergency contact phone number
  if (!/^[0-9]{11}$/.test(emergencyContact.phoneNumber)) {
    throw new apiError(400, "Emergency contact phone number is required");
  }

    // Validate phone number
  if (!/^[0-9]{11}$/.test(phoneNumber)) {
    throw new apiError(400, "Phone number must be exactly 11 digits");
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

  // validate picture
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


  // validate bloodGroup
   if (
    bloodGroup &&
    !["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"].includes(bloodGroup)
  ) {
    throw new apiError(400, "Invalid blood group value");
  }

  // vlidate dateOfBirth
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) {
    throw new apiError(400, "Invalid date of birth format");
  }

  // validate joinedAt
  const joinedDate = new Date(joinedAt);
  if (isNaN(joinedDate.getTime())) {
    throw new apiError(400, "Invalid joining date format");
  }

   // Validate password
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
    throw new apiError(
      400,
      "Password must be at least 8 characters, include uppercase, lowercase, and a number"
    );
  }

  // Check if Teacher  already exists
  const existingTeacher = await Teacher.findOne({ 
     $and: [
      { phoneNumber: phoneNumber },
      { firstName: firstName },
      { middleName: middleName },
    ],
  });

  if (existingTeacher) {
    throw new apiError(409, "Teacher  with this phone number already exists");  
  }

  // Create new Teacher
  const newTeacher = new Teacher({
    prefixName : prefixName ? prefixName : null,
    firstName,
    middleName,
    lastName : lastName ? lastName : null,
    dateOfBirth: dob,
    bloodGroup : bloodGroup ? bloodGroup : null,
    address,
    phoneNumber,  
    password,
    gender,
    emergencyContact,
    joinedAt: joinedDate,
    role,
    pic: pictureOnlinePath,
  });

  await newTeacher.save();

  // Remove password before sending response
  newTeacher.password = undefined;

  // Send response
  res
    .status(201)
    .json(
      new apiResponse(
        201,
        newTeacher,
        "Teacher registered successfully"
      )
    );


  } catch (error) {
    console.error("Teacher Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})


// 🔹 Teacher Login
    export const teacherLogin = asyncHandler(async (req, res) => {
  try {
    const { teacherId, password } = req.body;

    // Validate input
    if (!teacherId || !password) {
      throw new apiError(400, "Teacher ID and password are required");
    }

    // Validate teacherId format
    if (!/^[0-9]{8}$/.test(teacherId)) {
      throw new apiError(400, "Invalid Teacher ID format");
    }

    // Validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new apiError(
        400,
        "Password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
    }
    // Check if teacher exists
    const teacher = await Teacher.findOne({ teacherId }).select("+password");

    if (!teacher) {
      throw new apiError(404, "Teacher does not exist");
    }

    // Check if password is correct
    const isPasswordValid = await teacher.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid password");
    }

    // Generate tokens
    const accessToken = teacher.generateAccessToken();
    const refreshToken = teacher.generateRefreshToken();

    // Save refresh token to database
    teacher.refreshToken = refreshToken;
    await teacher.save({ validateBeforeSave: false });

    // remove password from response
    teacher.password = undefined;

    // Send response
    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(200, { accessToken, refreshToken }, "Login successful")
      );
  } catch (error) {
    console.error("Teacher Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Teacher Logout
export const teacherLogout = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user._id;

    // Find teacher and remove refresh token
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      throw new apiError(404, "Teacher does not found");
    }

    teacher.refreshToken = null;
    await teacher.save({ validateBeforeSave: false });
    // Clear cookies
    res.clearCookie("refreshToken", options);
    res.clearCookie("accessToken", options);

    // Send response
    res.status(200).json(new apiResponse(200, null, "Logout successful"));
  } catch (error) {
    console.error("Teacher Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get Teacher refreshTeacherTokens
export const teacherRefreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new apiError(401, "Refresh token missing");
    }

    // Find the teacher with matching refresh token
    const teacher = await Teacher.findOne({ refreshToken });
    if (!teacher) {
      throw new apiError(403, "Invalid refresh token");
    }

    // Validate refresh token using method (recommended)
    const isValid = teacher.validateRefreshToken(refreshToken);
    if (!isValid) {
      throw new apiError(403, "Refresh token expired or invalid");
    }

    // Generate new tokens
    const newAccessToken = teacher.generateAccessToken();
    const newRefreshToken = teacher.generateRefreshToken();

    // Save new refresh token
    teacher.refreshToken = newRefreshToken;
    await teacher.save({ validateBeforeSave: false });

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
  } catch (error) {
    console.error("Refresh Teacher Tokens Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Teacher password change

export const changeTeacherPassword = asyncHandler(async (req, res) => {
  try {
    const teacher_id = req.user._id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      throw new apiError(400, "Current and new passwords are required");
    }

    // Find teacher by ID
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      throw new apiError(404, "Teacher not found");
    }

    // Validate current password
    const isPasswordValid = await teacher.isPasswordCorrect(currentPassword);
    if (!isPasswordValid) {
      throw new apiError(401, "Current password is incorrect");
    }

    // Validate new password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      throw new apiError(
        400,
        "New password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
    }

    // Update password
    teacher.password = newPassword;
    await teacher.save();

    res
      .status(200)
      .json(new apiResponse(200, null, "Password changed successfully"));
  } catch (error) {
    console.error("Change Teacher Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});