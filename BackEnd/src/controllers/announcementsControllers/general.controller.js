import mongoose from "mongoose";


import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Announcement from "../../models/announcements/announcement.model.js";

export const getAnnouncementsCountByYear = asyncHandler(async (req, res) => {
  const currentYear = new Date().getFullYear();

  // 1. Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff") {
    targetAudience = ["all", "teacher" ,"guardian","Staff"];
  } else if (accountType === "Teacher") {
    targetAudience = ["all", "teacher" ,"guardian","Staff"];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  }

  // 2. Validate and parse year
  const yearToQuery = req.params.year ? Number(req.params.year) : currentYear;

  if (isNaN(yearToQuery) || yearToQuery < 1900 || yearToQuery > currentYear) {
    return new apiError( 400 ,`Year must be between 1900 and ${currentYear}`);
  }



  const startDate = new Date(`${yearToQuery}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${yearToQuery}-12-31T23:59:59.999Z`);

  // 3. Match both year AND check if ANY audience tag belongs to targetAudience
  const filterQuery = {
    createdAt: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
    isApproved: true, // Only count approved announcements  
  };

  // 4. Single aggregation query using $facet
  const [result] = await Announcement.aggregate([
    { $match: filterQuery },
    {
      $facet: {
        totalAnnouncements: [{ $count: "count" }],
        categories: [
          { $group: { _id: "$category", count: { $sum: 1 } } },
          { $project: { _id: 0, category: "$_id", count: 1 } },
        ],
      },
    },
  ]);

  // Extract total count safely (defaults to 0 if no announcements match)
  const totalAnnouncements = result?.totalAnnouncements[0]?.count || 0;
  const categories = result?.categories || [];

  res.status(200).json(
    new apiResponse(200, "Announcements count retrieved successfully", {
      totalAnnouncements,
      categories,
    })
  );
});


export const getAnnouncementsPerPage = asyncHandler(async (req, res) => {
  const { page = 1, limit = process.env.ANNOUNCEMENT_LIMIT, year, category } = req.body;

  // 1. Validate and default year filter
  const currentYear = new Date().getFullYear();
  const targetYear = year ? Number(year) : currentYear;

  if (isNaN(targetYear) || targetYear < 1900 || targetYear > currentYear) {
    return next(
      new apiError(400, `Year must be a valid number between 1900 and ${currentYear}`)
    );
  }

  // 2. Validate pagination parameters
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
    return new apiError(400, "Invalid page or limit provided");
  }

  // 3. Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff" || accountType === "Teacher" || accountType === "Admin") {
    targetAudience = ["all", "teachers", "staff", "guardian", "students"];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  } else if (accountType === "Student") {
    targetAudience = ["all", "students"];
  }

  // 4. Construct date range and base filter
  const startDate = new Date(`${targetYear}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${targetYear}-12-31T23:59:59.999Z`);

  const filterQuery = {
    createdAt: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
    isApproved: true,
  };

  // Optional category filter ("general", "academic", "event", "emergency")
  if (category) {
    filterQuery.category = category;
  }

  const skip = (parsedPage - 1) * parsedLimit;

  // 5. Fetch paginated results directly without aggregation/count
  const announcements = await Announcement.find(filterQuery)
    .select("-__v") // needed fields only
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parsedLimit);

  if (!announcements || announcements.length === 0) {
    return next(new apiError(404, "No announcements found for the requested criteria"));
  }

  res.status(200).json(
    new apiResponse(200, "Announcements retrieved successfully", {
      announcements,
    })
  );
});


export const getAnnouncementDetailsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // 1. Validate ID existence and string type
  if (!id || typeof id !== "string") {
    return next(new apiError(400, "Announcement ID is required and must be a string"));
  }

  // 2. Validate MongoDB ObjectId format using mongoose.Types.ObjectId.isValid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new apiError(400, "Invalid announcement ID format"));
  }

  // 3. Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff" || accountType === "Teacher" ) {
    targetAudience = ["all", "teacher", "staff", "guardian",];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  }

  // 4. Query announcement enforcing ID, approval status, and audience permissions
  const announcement = await Announcement.findOne({
    _id: id,
    isApproved: true,
    audience: { $in: targetAudience },
  }).select("-__v");

  if (!announcement) {
    return next(
      new apiError(404, "Announcement not found or you do not have permission to view it")
    );
  }

  res.status(200).json(
    new apiResponse(200, "Announcement retrieved successfully", {
      announcement,
    })
  );
});

export const getAnnouncementsByTitle = asyncHandler(async (req, res, next) => {
  const { title, year, page = 1, limit = process.env.ANNOUNCEMENT_LIMIT } = req.body;

  const currentYear = new Date().getFullYear();
  const targetYear = year ? Number(year) : currentYear;

  if (isNaN(targetYear) || targetYear < 1900 || targetYear > currentYear) {
    return next(new apiError(400, `Year must be between 1900 and ${currentYear}`));
  }

  const startDate = new Date(`${targetYear}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${targetYear}-12-31T23:59:59.999Z`);

  // Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff") {
    targetAudience = ["all", "teacher" ,"guardian","Staff"];
  } else if (accountType === "Teacher") {
    targetAudience = ["all", "teacher" ,"guardian","Staff"];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  }

  const filterQuery = {
    title: { $regex: title, $options: "i" }, // Case-insensitive search
    createdAt: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
    isApproved: true, // Only fetch approved announcements
  };

  const parsedPage = Math.max(1, parseInt(page, 10));
  const parsedLimit = Math.max(1, parseInt(limit, 10));
  const skip = (parsedPage - 1) * parsedLimit;

  const [result] = await Announcement.aggregate([
    { $match: filterQuery },
    {
      $facet: {
        totalAnnouncements: [{ $count: "count" }],
        announcements: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: parsedLimit },
          { $project: { __v: 0 } }, // Exclude the __v field
        ],
      },
    },
  ]);

  const totalAnnouncements = result?.totalAnnouncements[0]?.count || 0;
  const announcements = result?.announcements || [];

  if (totalAnnouncements === 0) {
    return next(new apiError(404, "No announcements found with the given title for this year"));
  }

  res.status(200).json(
    new apiResponse(200, "Announcements retrieved successfully", {
      totalAnnouncements,
      announcements,
    })
  );
});