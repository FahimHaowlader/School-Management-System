import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import options from "../../utils/options.js";
import apiResponse from "../../utils/apiResponse.js";
import uploadToCloudinary from "../../utils/Cloudinary.js";

// Model Import
import Guardian from "../../models/guardian.model.js";

// 🔹 Guardian Registration
export const guardianRegistration = asyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phoneNumber,
    gender,
    password,
    address,
    prefixName,
  } = req.body;
  // Validate input
  if (
    !firstName ||
    !password ||
    !phoneNumber ||
    !gender ||
    !middleName ||
    !address 
  ) {
    throw new apiError(400, "All required fields must be provided");
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
    pictureLocalPath &&
    !/^.*\.(png|jpg|jpeg|webp)$/i.test(pictureLocalPath)
  ) {
    throw new apiError(
      400,
      "Profile picture is required and must be PNG, JPG, JPEG, or WEBP"
    );
  }

  // upload to cloudinary
  let uploadResult = null;
    if(pictureLocalPath){
       uploadResult = await uploadToCloudinary(pictureLocalPath);
        }
  
  if (!uploadResult || !uploadResult.secure_url) {
    throw new apiError(500, "Failed to upload profile picture");
  }
  
  const pictureOnlinePath = uploadResult ? uploadResult.secure_url : null;

  // validate gender
  if (!["male", "female", "other"].includes(gender)) {
    throw new apiError(400, "Invalid gender value");
  }

  // validate phoneNumber
  if (!/^\d{11}$/.test(phoneNumber)) {
    throw new apiError(400, "Phone number must be exactly 11 digits");
  }

  // Check if guardian already exists
  const existingGuardian = await Guardian.findOne({
    $and: [
      { firstName: firstName.toLowerCase().trim() },
      { middleName: middleName.toLowerCase().trim() },
      { phoneNumber: phoneNumber.trim() },
    ],
  });
  if (existingGuardian) {
    throw new apiError(409, "Guardian with this email already exists");
  }

  // Create new guardian
  const guardian = await Guardian.create({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName ? lastName : null,
    prefixName: prefixName ? prefixName : null,
    password,
    phoneNumber: phoneNumber,
    address: address,
    gender,
    pic: pictureOnlinePath ? pictureOnlinePath : null,
  });

  // Remove password before sending response
  guardian.password = undefined;

  // Send response
  res
    .status(201)
    .json(
      new apiResponse(
        201,
        guardian,
        "Guardian registered successfully",
 
      )
    );
});

// 🔹 Guardian Login
export const guardianLogin = asyncHandler(async (req, res) => {
  try {
    const { guardianId, password } = req.body;

    // Validate input
    if (!guardianId || !password) {
      throw new apiError(400, "Guardian ID and password are required");
    }

    // Validate guardianId format
    if (!/^[0-9]{10}$/.test(guardianId)) {
      throw new apiError(400, "Invalid Guardian ID format");
    }

    // Validate password
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      throw new apiError(
        400,
        "Password must be at least 8 characters, include uppercase, lowercase, and a number"
      );
    }
    // Check if guardian exists
    const guardian = await Guardian.findOne({ guardianId }).select("+password");

    if (!guardian) {
      throw new apiError(404, "Guardian does not exist");
    }

    // Check if password is correct
    const isPasswordValid = await guardian.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new apiError(401, "Invalid password");
    }

    // Generate tokens
    const accessToken = guardian.generateAccessToken();
    const refreshToken = guardian.generateRefreshToken();

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
      .json(
        new apiResponse(200, { accessToken, refreshToken }, "Login successful")
      );
  } catch (error) {
    console.error("Guardian Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get Guardian refreshGuardianTokens
export const refreshGuardianTokens = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      throw new apiError(401, "Refresh token missing");
    }
  
    // Find the guardian with matching refresh token
    const guardian = await Guardian.findOne({ refreshToken });
    if (!guardian) {
      throw new apiError(403, "Invalid refresh token");
    }
  
    // Validate refresh token using method (recommended)
    const isValid = guardian.validateRefreshToken(refreshToken);
    if (!isValid) {
      throw new apiError(403, "Refresh token expired or invalid");
    }
  
    // Generate new tokens
    const newAccessToken = guardian.generateAccessToken();
    const newRefreshToken = guardian.generateRefreshToken();
  
    // Save new refresh token
    guardian.refreshToken = newRefreshToken;
    await guardian.save({ validateBeforeSave: false });
  
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
    console.error("Refresh Guardian Tokens Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get Guardian Logout
export const guardianLogout = asyncHandler(async (req, res) => {
  try {
    const guardian_id = req.user._id;

    // Find guardian and remove refresh token
    const guardian = await Guardian.findById(guardian_id);
    if (!guardian) {
      throw new apiError(404, "Guardian does not found");
    }

    guardian.refreshToken = null;
    await guardian.save({ validateBeforeSave: false });
    // Clear cookies
    res.clearCookie("refreshToken", options);
    res.clearCookie("accessToken", options);

    // Send response
    res.status(200).json(new apiResponse(200, null, "Logout successful"));
  } catch (error) {
    console.error("Guardian Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Change password for guardian
export const changeGuardianPassword = asyncHandler(async (req, res) => {
  try {
    const guardian_id = req.user._id;
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
    const guardian = await Guardian.findById(guardian_id).select("+password");
    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    // Check if current password is correct
    const isCurrentPasswordValid = await guardian.isPasswordCorrect(
      currentPassword
    );
    if (!isCurrentPasswordValid) {
      throw new apiError(401, "Current password is incorrect");
    }

    // Update to new password
    guardian.password = newPassword;
    await guardian.save();

    // Send response
    res
      .status(200)
      .json(new apiResponse(200, null, "Password changed successfully"));
  } catch (error) {
    console.error("Change Guardian Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
