const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema(
  {
    car: {
      type: ObjectId,
      ref: "Car",        // ✅ Use actual model name
      required: true
    },
    user: {
      type: ObjectId,
      ref: "User",       // ✅ FIXED
      required: true
    },
    owner: {
      type: ObjectId,
      ref: "User",       // ✅ Owner is also User
      required: true
    },
    pickupDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
