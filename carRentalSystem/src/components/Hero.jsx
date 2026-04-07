import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
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
      toast.error("Please select location and dates");
      return;
    }

    if (returnDate < pickupDate) {
      toast.error("Return date must be after pickup date");
      return;
    }

    navigate(
      `/cars?location=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">

      {/* Background blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Heading */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-bold text-center leading-tight"
      >
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Luxury Cars
        </span>{" "}
        on Rent
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 max-w-xl mt-4 text-center"
      >
        Choose your location and dates to explore premium rides with comfort and style.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-10 w-full max-w-5xl backdrop-blur-lg bg-white/70 border border-gray-200 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row gap-6"
      >

        {/* Location */}
        <div className="flex flex-col w-full">
          <label className="text-xs text-gray-500 mb-1 font-medium">
            Pickup Location
          </label>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <MapPin className="text-gray-400" size={18} />
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select city</option>
              {locations.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <p className="text-[11px] text-gray-400 mt-1">
            Where do you want to start your ride?
          </p>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col w-full">
          <label className="text-xs text-gray-500 mb-1 font-medium">
            Pickup Date
          </label>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <Calendar className="text-gray-400" size={18} />
            <input
              type="date"
              value={pickupDate}
              min={today}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <p className="text-[11px] text-gray-400 mt-1">
            Select your trip start date
          </p>
        </div>

        {/* Return Date */}
        <div className="flex flex-col w-full">
          <label className="text-xs text-gray-500 mb-1 font-medium">
            Return Date
          </label>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <Calendar className="text-gray-400" size={18} />
            <input
              type="date"
              value={returnDate}
              min={pickupDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <p className="text-[11px] text-gray-400 mt-1">
            Select your return date
          </p>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition w-full md:w-auto font-medium"
        >
           Search 
        </motion.button>
      </motion.form>

      {/* Car Image */}
      <motion.img
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.03 }}
        src={assets.main_car}
        alt="car"
        className="w-full max-w-3xl mt-12 drop-shadow-2xl"
      />
    </div>
  );
};

export default Hero;