import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Hero = () => {
  const { navigate } = useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const locations = ["Delhi", "Mumbai", "Bangalore", "Chandigarh"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupLocation || !pickupDate || !returnDate) {
      toast.error("Please fill all fields");
      return;
    }

    if (returnDate < pickupDate) {
      toast.error("Return date cannot be before pickup date");
      return;
    }

    navigate(
      `/cars?location=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 bg-gradient-to-br from-gray-50 to-gray-100 text-center">

      {/* Heading */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
      >
        Luxury Cars on Rent
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 max-w-lg mt-4"
      >
        Choose your location and dates to explore our premium collection of cars.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 md:p-4 md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-4"
      >

        {/* Location */}
        <div className="flex flex-col text-left w-full md:w-56">
          <label className="text-sm text-gray-500 mb-1">
            Pickup Location
          </label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">Select</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col text-left w-full md:w-auto">
          <label className="text-sm text-gray-500 mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            min={today}
            onChange={(e) => setPickupDate(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col text-left w-full md:w-auto">
          <label className="text-sm text-gray-500 mb-1">
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            min={pickupDate || today}
            onChange={(e) => setReturnDate(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition w-full md:w-auto shadow-md"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 brightness-200"
          />
          Search
        </motion.button>
      </motion.form>

      {/* Car Image */}
      <motion.img
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        src={assets.main_car}
        alt="car"
        className="w-full max-w-2xl md:max-w-4xl mt-10 object-contain"
      />
    </div>
  );
};

export default Hero;