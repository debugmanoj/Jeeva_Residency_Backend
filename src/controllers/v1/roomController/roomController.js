import Rooms from "../../../models/v1/roomSchema.js"
import { sendSuccess, sendError } from '../../../utils/v1/responseHandler/responseHandler.js';
import dayjs from "dayjs"; // Import Day.js
import timezone from "dayjs/plugin/timezone.js"; // Import timezone plugin
import utc from "dayjs/plugin/utc.js"; // Import UTC plugin

import { validateRequest } from '../../../utils/v1/validateRequest/validateRequest.js';


// Extend Day.js with UTC and Timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);


// Server-side fetch function to get rooms based on activeTab
const getRoomsBasedOnScrollableCondition = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const statusFilter = req.query.status || "All"; // Add status filter based on activeTab

  try {
    let query = {};
    if (statusFilter !== "All") {
      query.status = statusFilter; // Filter rooms based on status
    }

    const rooms = await Rooms.find(query).skip(skip).limit(limit);
    const total = await Rooms.countDocuments(query);

    

    res.status(200).json({
      success: true,
      data: rooms,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + limit < total,
    });
  } catch (error) {
    console.error("Error in scroll fetch:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Controller to get count of rooms based on check-in and check-out status
const getCheckInCheckOutCount = async (req, res) => {
  try {
    // Get the current date using Day.js
    const timestamp = dayjs().valueOf();
    const date = new Date();
    const currentDate = dayjs().utc().startOf("day");  // Use UTC time and start at midnight UTC
    const formattedDate = currentDate.toISOString();  // Format the date to ISO 8601 format





    // Count rooms that have checked in

    const checkInCount = await Rooms.countDocuments({
      "bookingDates.checkIn": { $lte: currentDate.toDate() }, // Convert Day.js object to native Date
      "bookingDates.checkOut": { $gte: currentDate.toDate() }, // Convert Day.js object to native Date
    });

    // Count rooms that have checked out
    const checkOutCount = await Rooms.countDocuments({
      "bookingDates.checkOut": { $lte: currentDate.toDate() }, // Convert Day.js object to native Date
    });


    res.status(200).json({
      success: true,
      checkInCount,
      checkOutCount,
    });
  } catch (error) {
    console.error("Error in check-in/check-out count:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller to get all available rooms
const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({ status: 'Available' }).select('roomNo'); // Fetch rooms with 'Available' status
    // Check if rooms are found
    if (!rooms || rooms.length === 0) {
      return sendError(res, "No available rooms found", 404); // No rooms found
    }
    // Respond with success and data
    return sendSuccess(res, "Available rooms fetched successfully", rooms);

  } catch (error) {
    return sendError(res, "Server error"); // Handle server error

  }
};











export default {
  getRoomsBasedOnScrollableCondition,
  getCheckInCheckOutCount,
  getAvailableRooms
};