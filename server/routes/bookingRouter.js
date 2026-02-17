const express = require("express");
const bookingController = require("../controllers/bookingController");
const protect = require("../middleware/auth");

const bookingRouter = express.Router();

bookingRouter.post(
  "/check-availability",
  bookingController.checkAvailabilityOfCar
);

bookingRouter.post(
  "/create",
  protect,
  bookingController.createBooking
);

bookingRouter.get(
  "/user",
  protect,
  bookingController.getUserBookings
);

bookingRouter.get(      // ✅ FIXED TO GET
  "/owner",
  protect,
  bookingController.getOwnerBookings
);

bookingRouter.post(
  "/change-status",
  protect,
  bookingController.changeBookingStatus
);

module.exports = bookingRouter;
