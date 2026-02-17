const express = require("express");
const bookingController = require("../controllers/bookingController.js");
const protect = require("../middleware/auth.js");

const bookingRouter = express.Router();

// Check availability
bookingRouter.post(
  "/check-availability",
  bookingController.checkAvailabilityOfCar
);

// Create booking
bookingRouter.post(
  "/create",
  protect,
  bookingController.createBooking
);

// Get user bookings
bookingRouter.get(
  "/user",
  protect,
  bookingController.getUserBookings
);

// ✅ Get owner bookings (FIXED TO GET)
bookingRouter.get(
  "/owner",
  protect,
  bookingController.getOwnerBookings
);

// Change booking status
bookingRouter.post(
  "/change-status",
  protect,
  bookingController.changeBookingStatus
);

module.exports = bookingRouter;
