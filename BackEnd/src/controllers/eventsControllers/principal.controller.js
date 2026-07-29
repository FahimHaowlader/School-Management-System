import mongoose from "mongoose";

import asyncHandler from "../../middlewares/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";


import Event from "../../models/events/event.model.js";

// update the status of a specific event
export const updateEventStatus = asyncHandler(async (req, res) => {
  try {
    const { eventId, newStatus } = req.body;

    if (!eventId || !newStatus) {
      throw new apiError(400, "Both eventId and newStatus are required");
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new apiError(400, "Invalid eventId");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new apiError(404, "Event not found");
    }

    // Update the event status
    event.status = newStatus;
    await event.save();

    return res.status(200).json(new apiResponse(200, event, "Event status updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// add a new event
export const addEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description, date, status } = req.body;

    if (!title || !description || !date || !status) {
      throw new apiError(400, "Title, description, date, and status are required");
    }

    // Create a new event
    const newEvent = new Event({ title, description, date, status });
    await newEvent.save();

    return res.status(201).json(new apiResponse(201, newEvent, "New event added successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// update an existing event
export const updateEvent = asyncHandler(async (req, res) => {
  try {
    const { eventId, title, description, date, status } = req.body;

    if (!eventId || !title || !description || !date || !status) {
      throw new apiError(400, "eventId, title, description, date, and status are required");
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new apiError(400, "Invalid eventId");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new apiError(404, "Event not found");
    }

    // Update the event fields
    event.title = title;
    event.description = description;
    event.date = date;
    event.status = status;

    await event.save();

    return res.status(200).json(new apiResponse(200, event, "Event updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

//upade event result of a specific event
export const updateEventResult = asyncHandler(async (req, res) => {
  try {
    const { eventId, result } = req.body;

    if (!eventId || !result) {
      throw new apiError(400, "Both eventId and result are required");
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new apiError(400, "Invalid eventId");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new apiError(404, "Event not found");
    }

    // Update the event result
    event.result = result;
    await event.save();

    return res.status(200).json(new apiResponse(200, event, "Event result updated successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});

// delete an event by ID
export const deleteEventById = asyncHandler(async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      throw new apiError(400, "eventId is required");
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new apiError(400, "Invalid eventId");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new apiError(404, "Event not found");
    }

    await event.remove();

    return res.status(200).json(new apiResponse(200, null, "Event deleted successfully"));
  } catch (error) {
    throw new apiError(500, error.message || "Internal Server Error");
  }
});