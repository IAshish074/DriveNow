const express = require("express")
const bookingController = require("../controllers/bookingController.js")
const protect = require("../middleware/auth.js")
const bookingRouter = express.Router()


bookingRouter.post('/check-availability',bookingController.checkAvailabilityOfCar)
bookingRouter.post('/create',protect,bookingController.createBooking)
bookingRouter.get('/user',protect,bookingController.getUserBookings)
bookingRouter.post('/owner',protect,bookingController.getOwnerBookings)
bookingRouter.post('/change-status',protect,bookingController.changeBookingStatus)




module.exports = bookingRouter

