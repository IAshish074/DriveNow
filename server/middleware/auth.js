const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // ✅ VERIFY token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from DB
    const user = await Users.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Attach user to request
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

module.exports = protect;
