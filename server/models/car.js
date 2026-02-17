const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",   // Make sure your User model name is "User"
      required: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true,
      min: 1900
    },

    category: {
      type: String,
      required: true,
      enum: ["Sedan", "SUV", "Hatchback", "Luxury", "Sports","Van"]
    },

    seating_capacity: {
      type: Number,
      required: true,
      min: 1
    },

    fuel_type: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"]
    },

    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic","Semi-Automatic"]
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
