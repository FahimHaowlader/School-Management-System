import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Event from "../../models/events/event.model.js";

export const getEventsCountByYear = asyncHandler(async (req, res) => {
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
    startingDate: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
  };

  // 4. Single aggregation query using $facet
  const [result] = await Event.aggregate([
    { $match: filterQuery },
    {
      $facet: {
        totalEvents: [{ $count: "count" }],
        categories: [
          { $group: { _id: "$category", count: { $sum: 1 } } },
          { $project: { _id: 0, category: "$_id", count: 1 } },
        ],
      },
    },
  ]);

  // Extract total count safely (defaults to 0 if no events match)
  const totalEvents = result?.totalEvents[0]?.count || 0;
  const categories = result?.categories || [];

  res.status(200).json(
    new apiResponse(200, "Events count retrieved successfully", {
      totalEvents,
      categories,
    })
  );
});

export const getEventsPerPage = asyncHandler(async (req, res) => {
  const { page = 1, limit = process.env.EVENT_LIMIT, category, year } = req.body;

  const currentYear = new Date().getFullYear();
  const targetYear = year ? Number(year) : currentYear;

  if (isNaN(targetYear) || targetYear < 1900 || targetYear > currentYear) {
    return new apiError(400, `Year must be a valid number between 1900 and ${currentYear}`);
  }

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
    return new apiError(400, "Invalid page or limit provided");
  }

  // 1. Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff" || accountType === "Teacher") {
    targetAudience = ["all", "teachers", "staff", "guardian"];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  }

  const startDate = new Date(`${targetYear}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${targetYear}-12-31T23:59:59.999Z`);

  // 2. Build filter query
  const filterQuery = {
    startingDate: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
  };

  if (category) {
    filterQuery.category = category;
  }

  // 3. Fetch paginated events directly
  const skip = (parsedPage - 1) * parsedLimit;

  const events = await Event.find(filterQuery)
    .sort({ startingDate: 1 })
    .select("-__v") // Exclude __v field // oly needed fields 
    .skip(skip)
    .limit(parsedLimit);

  res.status(200).json(
    new apiResponse(200, "Events retrieved successfully", {
      events,
    })
  );
});

export const getEventDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return new apiError(400,"Event ID is required and must be a string");
  }
  if(!options.isValidObjectId(id)) {
    return new apiError(400, "Invalid event ID format");
  }
  

  const event = await Event.findById(id).select("-__v");

  if (!event) {
    return new apiError(400, "Event not found");
  }

  res.status(200).json(
    new apiResponse(200, "Event retrieved successfully", {
      event,
    })
  );
});

export const getEventsByTitle = asyncHandler(async (req, res, next) => {
  const { title, year, page = 1, limit = process.env.EVENT_LIMIT  } = req.body;

  const currentYear = new Date().getFullYear();
  const targetYear = year ? Number(year) : currentYear;

  // 1. Validate year
  if (isNaN(targetYear) || targetYear < 1900 || targetYear > currentYear) {
    return next(
      new apiError(400, `Year must be a valid number between 1900 and ${currentYear}`)
    );
  }

  // 2. Validate title input
  if (!title || typeof title !== "string" || !title.trim()) {
    return next(new apiError(400, "Title is required and must be a non-empty string"));
  }

  // 3. Validate pagination parameters
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
    return next(new apiError(400, "Invalid page or limit provided"));
  }

  // 4. Determine allowed audience array based on accountType
  const accountType = req.user?.accountType;
  let targetAudience = ["all"];

  if (accountType === "Staff" || accountType === "Teacher") {
    targetAudience = ["all", "teachers", "staff", "guardian"];
  } else if (accountType === "Guardian") {
    targetAudience = ["all", "guardian"];
  }

  // 5. Construct date range and filter
  const startDate = new Date(`${targetYear}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${targetYear}-12-31T23:59:59.999Z`);
  const sanitizedTitle = title.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const filterQuery = {
    startingDate: { $gte: startDate, $lte: endDate },
    audience: { $in: targetAudience },
    title: { $regex: sanitizedTitle, $options: "i" },
  };

  const skip = (parsedPage - 1) * parsedLimit;

  // 6. Single query using $facet
  const [result] = await Event.aggregate([
    { $match: filterQuery },
    {
      $facet: {
        totalEvents: [{ $count: "count" }],
        events: [
          { $sort: { startingDate: 1 } },
          { $skip: skip },
          { $limit: parsedLimit },
          { $project: { __v: 0 } }, // Replaces .select("-__v") //only need information 
        ],
      },
    },
  ]);

  const totalEvents = result?.totalEvents[0]?.count || 0;
  const events = result?.events || [];

  if (events.length === 0) {
    return next(new apiError(404, "No events found with the given title for this year"));
  }

  res.status(200).json(
    new apiResponse(200, "Events retrieved successfully", {
      totalEvents,
      events,
    })
  );
});

