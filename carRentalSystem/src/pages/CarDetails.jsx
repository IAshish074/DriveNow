import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios, currency } = useAppContext();

  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // 🔥 Fetch car from backend
  const fetchCar = async () => {
    try {
      const { data } = await axios.get(`/api/user/cars`);

      if (data.success) {
        const selectedCar = data.cars.find(
          (c) => c._id === id
        );
        setCar(selectedCar);
      }
    } catch (error) {
      toast.error("Failed to fetch car");
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  // 🔥 Calculate total days
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * (car?.pricePerDay || 0);

  // 🔥 Booking Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast.error("Please select dates");
      return;
    }

    if (returnDate <= pickupDate) {
      toast.error("Return date must be after pickup date");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/booking/create",
        {
          carId: car._id,
          pickupDate,
          returnDate,
        }
      );

      if (data.success) {
        toast.success("Booking Created Successfully");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-20">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 mt-8 text-gray-500 hover:text-red-600 transition"
      >
        <img
          src={assets.arrow_icon}
          alt=""
          className="rotate-180 opacity-70 w-4"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt=""
            className="w-full rounded-2xl shadow-lg mb-8"
          />

          <h1 className="text-3xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-500 mt-2">
            {car.category} • {car.year}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <Spec icon={assets.users_icon} text={`${car.seating_capacity} Seats`} />
            <Spec icon={assets.fuel_icon} text={car.fuel_type} />
            <Spec icon={assets.car_icon} text={car.transmission} />
            <Spec icon={assets.location_icon} text={car.location} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600">{car.description}</p>
          </div>
        </div>

        {/* Booking Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-24"
        >
          <p className="text-2xl font-semibold">
            {currency}{car.pricePerDay}
            <span className="text-sm text-gray-400"> / day</span>
          </p>

          <hr className="my-6" />

          <div className="flex flex-col gap-2">
            <label>Pickup Date</label>
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label>Return Date</label>
            <input
              type="date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="border px-3 py-2 rounded"
            />
          </div>

          {totalDays > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p>Total Days: {totalDays}</p>
              <p className="font-semibold text-lg">
                Total: {currency}{totalPrice}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

          <p className="text-center text-sm mt-3">
            No credit card required
          </p>
        </form>

      </div>
    </div>
  );
};

export default CarDetails;


// 🔥 Small reusable component
const Spec = ({ icon, text }) => (
  <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl">
    <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);
