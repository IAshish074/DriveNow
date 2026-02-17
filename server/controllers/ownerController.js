const User = require("../models/users.js");
const imagekit = require("../config/imageKit.js");
const Car = require("../models/car.js");
const Booking = require("../models/Booking.js");


// ===== Change Role =====
exports.changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({
      success: true,
      message: "Now you can list cars",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Add Car =====
exports.addCar = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const car = JSON.parse(req.body.carData);

    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + ".jpg",
      folder: "cars",
      useUniqueFileName: true,
    });

    const newCar = await Car.create({
      ...car,
      owner: _id,
      image: response.url,
    });

    res.status(201).json({
      success: true,
      data: newCar,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Get Owner Cars =====
exports.getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;

    const cars = await Car.find({ owner: _id });

    res.json({ success: true, cars });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Toggle Car Availability =====
exports.toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    car.isAvailable = !car.isAvailable;

    await car.save();

    res.json({
      success: true,
      message: "Availability updated",
      isAvailable: car.isAvailable,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== Delete Car =====
exports.deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Car.findByIdAndDelete(carId);

    res.json({
      success: true,
      message: "Car deleted successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cars = await Car.find({ owner: _id });

    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = bookings.filter(
      (b) => b.status === "pending"
    );

    const completedBookings = bookings.filter(
      (b) => b.status === "confirmed"
    );

    // Current month filter
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyRevenue = completedBookings
      .filter((b) => {
        const bookingDate = new Date(b.createdAt);
        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, b) => acc + b.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to update user image

exports.updateImage = async (req, res) => {
  try {
    const { _id } = req.user;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: Date.now() + ".jpg",
      folder: "users",
      useUniqueFileName: true,
    });

    // Update user image
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { image: response.url },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile image updated",
      user: updatedUser,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

