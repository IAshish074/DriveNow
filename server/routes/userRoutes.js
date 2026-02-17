const express = require("express");
const userRouter = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  getCars
} = require("../controllers/userController");

const protect = require("../middleware/auth");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);   // 🔥 ADD THIS
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);

module.exports = userRouter;
