require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("../config/db");

const userRouter = require("../routes/userRoutes");
const ownerRouter = require("../routes/ownerRouter");
const bookingRouter = require("../routes/bookingRouter");

const app = express();

// ===== CORS =====
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://drive-now-virid.vercel.app",
    credentials: true,
  })
);

// ===== Middlewares =====
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ===== Routes =====
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// ===== Connect DB and export (Vercel serverless - no app.listen) =====
connectDb().catch((err) => {
  console.error("Database connection failed ❌", err.message);
});

module.exports = app;
