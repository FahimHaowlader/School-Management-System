import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Event from "../../models/events/event.model.js";



// add a new event
export const addEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description, pic, audience, assignedTechnician } = req.body;

    // Validate required fields
    if (!title || !description || !pic || !audience) {
      return new apiError(400,"Title, description, profile picture, and audience are required");
    }

    // Create a new event document
    const newEvent = await Event.create({
      title,
      description,
      pic,
      audience,
      assignedTechnician,
      madeBy: req.user._id, // Assuming the user ID is available in req.user
      madeByModel: "Technician", // Assuming the user model is Technician
    });

    res.status(201).json(apiResponse(true, "Event added successfully", newEvent));
  } catch (error) {
    console.error("Error adding event:", error);
    throw new apiError(500,"Failed to add event");
  }
});


// get event. by search from all events
export const getEventsBySearch = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return new apiError(400,"Search query parameter is required");
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(search, "i");

    // Find events that match the search criteria in title or description
    const events = await Event.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });

    if (!events || events.length === 0) {
      return new apiError(404,"No events found matching the search criteria");
    }

    res.status(200).json(apiResponse(true, "Events retrieved successfully", events));
  } catch (error) {
    console.error("Error retrieving events by search:", error);
    throw new apiError(500,"Failed to retrieve events by search");
  }
});

// get all pending events for a specific technician
export const getPendingEventsForTechnician = asyncHandler(async (req, res) => {
  try {
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find events that are pending and assigned to the specific technician
    const pendingEvents = await Event.find({
      status: "pending",
      assignedTechnician: technicianId,
    });

    if (!pendingEvents || pendingEvents.length === 0) {
      return new apiError(404,"No pending events found for the specified technician");
    }

    res.status(200).json(apiResponse(true, "Pending events retrieved successfully", pendingEvents));
  } catch (error) {
    console.error("Error retrieving pending events for technician:", error);
    throw new apiError(500,"Failed to retrieve pending events for technician");
  }
});

// get all reviewed events for a specific technician
export const getReviewedEventsForTechnician = asyncHandler(async (req, res) => {
  try {
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find events that are reviewed (approved or rejected) and assigned to the specific technician
    const reviewedEvents = await Event.find({
      status: { $in: ["approved", "rejected"] },
      assignedTechnician: technicianId,
    });

    if (!reviewedEvents || reviewedEvents.length === 0) {
      return new apiError(404,"No reviewed events found for the specified technician");
    }

    res.status(200).json(apiResponse(true, "Reviewed events retrieved successfully", reviewedEvents));
  } catch (error) {
    console.error("Error retrieving reviewed events for technician:", error);
    throw new apiError(500,"Failed to retrieve reviewed events for technician");
  }
});


// get updated event by id for a specific technician
export const getEventByIdForTechnician = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.params;
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find the event by ID and ensure it is assigned to the specific technician
    const event = await Event.findOne({
      _id: eventId,
      assignedTechnician: technicianId,
    });

    if (!event) {
      return new apiError(404,"Event not found or you do not have permission to view it");
    }

    res.status(200).json(apiResponse(true, "Event retrieved successfully", event));
  } catch (error) {
    console.error("Error retrieving event by ID for technician:", error);
    throw new apiError(500,"Failed to retrieve event by ID for technician");
  }
});


// update event result by id for a specific technician
export const updateEventResultByIdForTechnician = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.params;
    const { result } = req.body;
    const technicianId = req.user._id; // Assuming the technician's ID is available in req.user

    // Find the event by ID and ensure it is assigned to the specific technician
    const event = await Event.findOne({
      _id: eventId,
      assignedTechnician: technicianId,
    });

    if (!event) {
      return new apiError(404,"Event not found or you do not have permission to update it");
    }

    // Update the result field of the event
    event.result = result;
    await event.save();

    res.status(200).json(apiResponse(true, "Event result updated successfully", event));
  } catch (error) {
    console.error("Error updating event result by ID for technician:", error);
    throw new apiError(500,"Failed to update event result by ID for technician");
  }
});




