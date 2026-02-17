const Booking = require("../models/Booking.js");
const Car = require("../models/car.js");


// ===== Check Car Availability =====
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });

  return bookings.length === 0;
};



// ===== Check Available Cars =====
exports.checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const cars = await Car.find({
      location,
      isAvailable: true,
    });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);

    availableCars = availableCars.filter(
      (car) => car.isAvailable === true
    );

    res.json({ success: true, availableCars });

  } catch (error) {
    console.log(error.message);
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

    const carData = await Car.findById(car);

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
    console.log(error.message);
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
    console.log(error.message);
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
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Change Booking Status =====
exports.changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== _id.toString()) {
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
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
