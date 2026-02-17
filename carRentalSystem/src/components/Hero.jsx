import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import {motion} from 'motion/react'
import toast from "react-hot-toast";

const Hero = () => {
  const { navigate } = useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const locations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chandigarh",
  ];

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
    <motion.div 
    initial = {{ opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{duration:0.8}}
    
    className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gradient-to-br from-gray-50 to-gray-100 px-6 text-center">

      {/* Heading */}
      <motion.h1 
      initial={{y:50,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.2}}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
        Luxury Cars on Rent
      </motion.h1>

      <p className="text-gray-500 max-w-xl">
        Choose your location and dates to explore our premium collection of cars.
      </p>

      {/* Search Form */}
      <motion.form
      initial={{scale:0.95,opacity:0,y:50}}
      animate={{scale:1,opacity:1,y:0}}
      transition={{duration:0.6,delay:0.4}}
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-6 bg-white 
                   p-6 rounded-2xl md:rounded-full shadow-lg 
                   w-full max-w-5xl"
      >

        {/* Location */}
        <select
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
          className="w-full md:w-56 px-4 py-3 border border-gray-300 
                     rounded-full outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Pickup Date */}
        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          min={today}
          required
          className="w-full md:w-auto px-4 py-3 border border-gray-300 
                     rounded-full outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Return Date */}
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={pickupDate || today}
          required
          className="w-full md:w-auto px-4 py-3 border border-gray-300 
                     rounded-full outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Search Button */}
        <motion.button
        whileHover={{scale:1.05 , }}
        whileTap={{scale:0.95}}

          type="submit"
          className="flex items-center justify-center gap-2 
                     px-8 py-3 bg-red-600 hover:bg-red-700 
                     text-white rounded-full transition w-full md:w-auto"
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
      initial = {{y:100,opacity:0}}
      animate = {{y:0,opacity:1}}
      transition={{duration:0.8,delay:0.6}}
        src={assets.main_car}
        alt="car"
        className="w-full max-w-3xl object-contain"
      />

    </motion.div>
  );
};

export default Hero;
