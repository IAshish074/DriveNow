require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDb = require("./config/db");

const userRouter = require("./routes/userRoutes");
const ownerRouter = require("./routes/ownerRouter");
const bookingRouter = require("./routes/bookingRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== CORS (VERY IMPORTANT FOR COOKIES) =====
app.use(
  cors({
    origin: "https://drive-now-virid.vercel.app",
    credentials: true,
  })
);

// ===== Middlewares =====
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ===== Routes =====
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/booking", bookingRouter);

// ===== Start Server AFTER DB Connected =====
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed ❌", err.message);
  });
