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

// ===== Ensure DB is connected on every request (serverless pattern) =====
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (err) {
        console.error("DB connection error:", err.message);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

// ===== Health Check Route =====
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// ===== Routes =====
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

module.exports = app;
