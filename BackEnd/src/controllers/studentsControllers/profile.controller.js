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

      const student = await Student.findById(student_id);
      if (!student) {
        throw new apiError(404, "Student not found");
      }

      // Update fields if provided
      if (prefixName) student.prefixName = prefixName;
      if (firstName) student.firstName = firstName;
      if (middleName) student.middleName = middleName;
      if (lastName) student.lastName = lastName;
      if (dateOfBirth) student.dateOfBirth = dateOfBirth;
      if (gender) student.gender = gender;
      if (bloodGroup) student.bloodGroup = bloodGroup;

      await student.save();

      res
        .status(200)
        .json(new  apiResponse(200,student, "Student profile updated", ));
    } catch (error) {
      console.error("Update Student personal information Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// 🔹 Student Contact information Update
export const updateStudentContactInformation = asyncHandler(
  async (req, res) => {
    try {
      const student_id = req.user._id;
      const { address, phoneNumber} = req.body;

      // Validate required fields
      if (!address || !phoneNumber) {
        throw new apiError(400, "Please provide all required fields");
      }

      // validate address
      if (address.length < 5 || address.length > 200) {
        throw new apiError(400, "Address must be between 5 and 200 characters");
      }

      // validate phoneNumber
    if (!/^\d{11}$/.test(phoneNumber)) {
      throw new apiError(400, "Phone number must be exactly 11 digits");
    }

      const student = await Student.findById(student_id);
      if (!student) {
        throw new apiError(404, "Student not found");
      }

      // Update fields if provided
      if (address) student.address = address;
      if (phoneNumber) student.phoneNumber = phoneNumber;

      await student.save();

      res
        .status(200)
        .json(new apiResponse(200, student, "Student contact information updated"));
    } catch (error) {
      console.error("Update Student contact information Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// 🔹 Student Profile Picture Update
export const updateStudentProfilePicture = asyncHandler(
  async (req, res) => {
    try {
      const student_id = req.user._id;

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

    const pictureOnlinePath = uploadResult.secure_url

      const student = await Student.findById(student_id);
      if (!student) {
        throw new apiError(404, "Student not found");
      }

      student.pic = uploadResult.secure_url;
      await student.save();

      res
        .status(200)
        .json(
           new apiResponse(
            200,
            student,
            "Student profile picture updated",
          )
        );
    } catch (error) {
      console.error("Update Student profile picture Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// 🔹 Student ScholarShip Update
export const updateStudentScholarShip = asyncHandler(
    async (req, res) => {
        try {
        const student_id = req.user._id;
        const { scholarShip } = req.body;
        // Validate required fields
        if (scholarShip === undefined) {
            throw new apiError(400, "Please provide all required fields");
        }
        // validate scholarShip
        const scholarShipNum = Number(scholarShip);
        if (isNaN(scholarShipNum) || scholarShipNum < 0 || scholarShipNum > 100) {
            throw new apiError(400, "Invalid scholarShip amount");
        }

        const student = await Student.findById(student_id);
        if (!student) {
            throw new apiError(404, "Student not found");
        }

        // Update fields if provided
        student.scholarShip = scholarShipNum;

        await student.save();

        res
            .status(200)
            .json(new  apiResponse(200,student, "Student scholarShip updated", ));
        } catch (error) {
        console.error("Update Student scholarShip Error:", error);
        res.status(500).json({ message: "Internal server error" });
        }
    }
);


// ================= END OF STUDENT PROFILE CONTROLLERS =================



