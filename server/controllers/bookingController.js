const Booking = require("../models/Booking");
const Car = require("../models/car");

// ===== Check Car Availability =====
const checkAvailability = async (carId, pickupDate, returnDate) => {

  const bookings = await Booking.find({
    car: carId,
    pickupDate: { $lt: new Date(returnDate) },
    returnDate: { $gt: new Date(pickupDate) },
  });

  return bookings.length === 0;
};


// ===== Check Available Cars =====
exports.checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const cars = await Car.find({
      location,
      isAvailable: true,
    });

    const availableCars = [];

    for (let car of cars) {
      const available = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      if (available) {
        availableCars.push(car);
      }
    }

    res.json({ success: true, availableCars });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Create Booking =====
exports.createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (returned <= picked) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    const carData = await Car.findById(car);

    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const isAvailable = await checkAvailability(
      car,
      pickupDate,
      returnDate
    );

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available",
      });
    }

    const noOfDays = Math.ceil(
      (returned - picked) / (1000 * 60 * 60 * 24)
    );

    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({
      success: true,
      message: "Booking created successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Get User Bookings =====
exports.getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Get Owner Bookings =====
exports.getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await Booking.find({
      owner: req.user._id,
    })
      .populate("car user")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Change Booking Status =====
exports.changeBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Status updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
