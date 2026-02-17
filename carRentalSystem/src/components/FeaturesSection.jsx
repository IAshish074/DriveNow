import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCards from "./CarCards";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion"; 

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-50 py-20 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* ===== Title ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventures."
        />
      </motion.div>

      {/* ===== Cards Grid ===== */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cars && cars.length > 0 ? (
          cars.slice(0, 6).map((car) => (
            <CarCards key={car._id} car={car} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No cars available
          </p>
        )}
      </motion.div>

      {/* ===== Button ===== */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            navigate("/cars");
            window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ FIXED
          }}
          className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md"
        >
          Explore all cars
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="w-4 brightness-200"
          />
        </button>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
