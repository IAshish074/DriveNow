import React, { useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCards from "../components/CarCards";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  const { axios } = useAppContext();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const [cars, setCars] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= Fetch Available Cars =================
  const fetchAvailableCars = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/booking/check-availability",
        {
          location,
          pickupDate,
          returnDate,
        }
      );

      if (data.success) {
        setCars(data.availableCars);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location && pickupDate && returnDate) {
      fetchAvailableCars();
    }
  }, [location, pickupDate, returnDate]);

  // ================= Advanced Smart Filter =================
  const filteredCars = useMemo(() => {
    if (!input.trim()) return cars;

    const search = input.toLowerCase();

    return cars.filter((car) => {
      return (
        car.brand?.toLowerCase().includes(search) ||
        car.model?.toLowerCase().includes(search) ||
        car.category?.toLowerCase().includes(search) ||
        car.fuel_type?.toLowerCase().includes(search) ||
        car.transmission?.toLowerCase().includes(search) ||
        car.location?.toLowerCase().includes(search) ||
        String(car.year)?.includes(search) ||
        String(car.seating_capacity)?.includes(search)
      );
    });
  }, [cars, input]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= Header ================= */}
      <div className="flex flex-col items-center py-20 px-6">

        <Title
          title="Available Cars"
          subTitle="Browse cars available for your selected dates."
        />

        {/* Selected Filters */}
        {location && (
          <p className="mt-4 text-gray-600 text-sm text-center">
            📍 <span className="font-semibold">{location}</span> | 📅{" "}
            {pickupDate} → {returnDate}
          </p>
        )}

        {/* Search Bar */}
        <div className="flex items-center bg-white px-5 mt-8 w-full max-w-2xl h-14 rounded-full shadow-md">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 mr-3 opacity-60"
          />

          <input
            type="text"
            placeholder="Search by make, model, fuel, location..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />

          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4 h-4 opacity-60"
          />
        </div>

      </div>

      {/* ================= Cars Section ================= */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pb-20">

        {loading ? (
          <p className="text-center text-gray-500">
            Loading available cars...
          </p>
        ) : (
          <>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Showing {filteredCars.length}{" "}
              {filteredCars.length === 1 ? "Car" : "Cars"}
            </p>

            {filteredCars.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                🚫 No cars available for selected filters
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                  <CarCards key={car._id} car={car} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cars;
