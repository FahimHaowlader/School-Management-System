import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";

import Syllabus from "../../models/syllabus.model.js";
import Class from "../../models/class.model.js";
import Teacher from "../../models/teacher.model.js";
import guardian from "../../models/guardian.model.js";
import Student from "../../models/student.model.js";
import staff from "../../models/staff.model.js";


// get the count of the guardian 
export const getGuardianCount = asyncHandler(async (req, res) => {
  const guardianCount = await Guardian.countDocuments();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { count: guardianCount },
        "Guardian count fetched successfully"
      )
    );
});

// get all guardian with pagination
export const getAllGuardians = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch guardians with pagination
    const guardians = await Guardian.find()
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .lean();

    // Get the total count of guardians for pagination info
    const totalGuardians = await Guardian.countDocuments();

    if (!guardians || guardians.length === 0) {
      throw new apiError(404, "No guardians found");
    }

    return res.status(200).json(
      new apiResponse(200, {
        guardians,
        totalGuardians,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalGuardians / limit),
      }, "Guardians fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// search guardians by name or email
export const searchGuardians = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      throw new apiError(400, "Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find guardians that match the search criteria in name or email
    const guardians = await Guardian.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });

    if (!guardians || guardians.length === 0) {
      throw new apiError(404, "No guardians found matching the search criteria");
    }

    return res.status(200).json(
      new apiResponse(200, guardians, "Guardians fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get guardian by ID
export const getGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    return res.status(200).json(
      new apiResponse(200, guardian, "Guardian fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// get add new guardian
export const addGuardian = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      throw new apiError(400, "Name, email, and phone are required");
    }

    // Check if a guardian with the same email already exists
    const existingGuardian = await Guardian.findOne({ email });
    if (existingGuardian) {
      throw new apiError(400, "A guardian with this email already exists");
    }

    // Create a new guardian
    const newGuardian = new Guardian({
      name,
      email,
      phone,
      address,
    });

    // Save the guardian to the database
    await newGuardian.save();

    return res.status(201).json(
      new apiResponse(201, newGuardian, "Guardian added successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// verify guardian by ID
export const verifyGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    // Update the verified status of the guardian
    guardian.verified = true;
    await guardian.save();

    return res.status(200).json(
      new apiResponse(200, guardian, "Guardian verified successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// delete unverified guardian by ID
export const deleteUnverifiedGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    if (guardian.verified) {
      throw new apiError(400, "Cannot delete a verified guardian");
    }

    await Guardian.findByIdAndDelete(id);

    return res.status(200).json(
      new apiResponse(200, null, "Unverified guardian deleted successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});


// update guardian by ID
export const updateGuardianById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "Invalid guardian ID");
  }

  // Find and update in a single database round-trip
  const updatedGuardian = await Guardian.findByIdAndUpdate(
    id,
    {
      $set: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(address && { address }),
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedGuardian) {
    throw new apiError(404, "Guardian not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedGuardian, "Guardian updated successfully")
    );
});

// delete guardian by ID
export const deleteGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    await Guardian.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new apiResponse(200, null, "Guardian deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// suspend guardian by ID
export const suspendGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    // Update the suspended status of the guardian
    guardian.suspended = true;
    await guardian.save();

    return res
      .status(200)
      .json(new apiResponse(200, guardian, "Guardian suspended successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

// unsuspend guardian by ID
export const unsuspendGuardianById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new apiError(400, "Invalid guardian ID");
    }

    const guardian = await Guardian.findById(id);

    if (!guardian) {
      throw new apiError(404, "Guardian not found");
    }

    // Update the suspended status of the guardian
    guardian.suspended = false;
    await guardian.save();

    return res
      .status(200)
      .json(new apiResponse(200, guardian, "Guardian unsuspended successfully"));
  } catch (error) {
    throw new apiError(500, error.message);
  }
});
