import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";

// Model Import
import Staff from "../../models/staff.model.js";

// 🔹 Staff Registration
export const staffRegistration = asyncHandler(async (req, res) => {
  const {
    prefixName,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    bloodGroup,
    address,
    phoneNumber,
    password,
    gender,
    joinedAt,
    role,
    position,
    emergencyContact,
  } = req.body;

  // Validate input
  const requiredFields = {
    prefixName,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    bloodGroup,
    address,
    phoneNumber,
    password,
    gender,
    joinedAt,
    role,
    position,
    emergencyContact,
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

  // validate admittedAt
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

  // Check if staff with the same phone number already exists
  const existingStaff = await Staff.findOne({
    $and: [
      { phoneNumber: phoneNumber },
      { firstName: firstName },
      { middleName: middleName },
      { dateOfBirth : dob },
    ],
  });
  if (existingStaff) {
    throw new apiError(409, "Staff with this phone number already exists");
  }

  // Create new staff
  const staff = await Staff.create({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName ? lastName : null,
    prefixName: prefixName ? prefixName : null,
    dateOfBirth : dob,
    phoneNumber: phoneNumber,
    address: address,
    password,
    pic: pictureOnlinePath,
    emergencyContact,
    gender,
    joinedAt: joinedDate,
    bloodGroup: bloodGroup ? bloodGroup : null,
    role,
    position,
  });

  // Remove password before sending response
  staff.password = undefined;

  res
    .status(201)
    .json(
      apiResponse( 201, staff, "Staff registered successfully")
    );
});

// 🔹 Staff Login
export const staffLogin = asyncHandler(async (req, res) => {
  try {
    const { staffId, password } = req.body;

    // Validate input
    if (!staffId || !password) {
      throw new apiError(400, "Staff ID and password are required");
    }

    // Validate staffId format
    if (!/^[0-9]{10}$/.test(staffId)) {
      throw new apiError(400, "Invalid Staff ID format");
    }

    // Validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new apiError(
        400,
        "Password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
    }
    // Check if staff exists
    const staff = await Staff.findOne({ staffId }).select("+password");

    if (!staff) {
      throw new apiError(404, "Staff does not exist");
    }

    // Check if password is correct
    const isPasswordValid = await staff.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid password");
    }

    // Generate tokens
    const accessToken = staff.generateAccessToken();
    const refreshToken = staff.generateRefreshToken();

    // Save refresh token to database
    staff.refreshToken = refreshToken;
    await staff.save({ validateBeforeSave: false });

    // remove password from response
    staff.password = undefined;

    // Send response
    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new apiResponse(200, { accessToken, refreshToken }, "Login successful")
      );
  } catch (error) {
    console.error("Staff Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Staff Logout
export const staffLogout = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user._id;

    // Find staff and remove refresh token
    const staff = await Staff.findById(staff_id);
    if (!staff) {
      throw new apiError(404, "Staff does not found");
    }

    staff.refreshToken = null;
    await staff.save({ validateBeforeSave: false });
    // Clear cookies
    res.clearCookie("refreshToken", options);
    res.clearCookie("accessToken", options);

    // Send response
    res.status(200).json(new apiResponse(200, null, "Logout successful"));
  } catch (error) {
    console.error("Staff Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Refresh Staff Tokens
export const staffRefreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new apiError(401, "Refresh token missing");
    }

    // Find the staff with matching refresh token
    const staff = await Staff.findOne({ refreshToken });
    if (!staff) {
      throw new apiError(403, "Invalid refresh token");
    }

    // Validate refresh token using method (recommended)
    const isValid = staff.validateRefreshToken(refreshToken);
    if (!isValid) {
      throw new apiError(403, "Refresh token expired or invalid");
    }

    // Generate new tokens
    const newAccessToken = staff.generateAccessToken();
    const newRefreshToken = staff.generateRefreshToken();

    // Save new refresh token
    staff.refreshToken = newRefreshToken;
    await staff.save({ validateBeforeSave: false });

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
    console.error("Refresh Staff Tokens Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Change password for staff
export const changeStaffPassword = asyncHandler(async (req, res) => {
  try {
    const staff_id = req.user._id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      throw new apiError(400, "Current and new passwords are required");
    }

    // Find staff by ID
    const staff = await Staff.findById(staff_id);
    if (!staff) {
      throw new apiError(404, "Staff not found");
    }

    // Validate current password
    const isPasswordValid = await staff.isPasswordCorrect(currentPassword);
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
    staff.password = newPassword;
    await staff.save();

    res
      .status(200)
      .json(new apiResponse(200, null, "Password changed successfully"));
  } catch (error) {
    console.error("Change Staff Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
