const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Car = require("../models/car.js");

// ===== Generate JWT Token =====
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ===== Cookie Options (Reusable) =====
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,           // true on Vercel (HTTPS), false on localhost
  sameSite: isProduction ? "none" : "lax",  // "none" required for cross-origin cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ===== Register =====
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== Login =====
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===== Logout =====
const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions); // 🔥 important
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ===== Get User Data =====
const getUserData = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// ===== Get Cars =====
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  getCars,
};
