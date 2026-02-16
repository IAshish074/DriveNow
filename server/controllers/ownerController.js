const User = require("../models/users.js");
const imagekit = require("../config/imageKit.js");
const Car = require("../models/car.js");

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

    console.log("Uploaded URL:", response.url);
    console.log("Saved URL:", newCar.image);

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

