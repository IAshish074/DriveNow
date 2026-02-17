import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch From Backend
  const fetchMyBookings = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "/api/booking/user"
      );

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-20">

      <Title
        title="My Bookings"
        subTitle="View and manage all your car bookings"
        align="left"
      />

      {loading ? (
        <p className="mt-12 text-gray-500">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="mt-12 text-gray-500">
          No bookings found.
        </p>
      ) : (
        <div className="mt-12 space-y-8">

          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6"
            >

              {/* Car Info */}
              <div>
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={booking.car?.image}
                    alt=""
                    className="w-full aspect-video object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold">
                  {booking.car?.brand}{" "}
                  {booking.car?.model}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {booking.car?.year} •{" "}
                  {booking.car?.category} •{" "}
                  {booking.car?.location}
                </p>
              </div>

              {/* Booking Info */}
              <div className="md:col-span-2">

                <div className="flex items-center gap-3 flex-wrap">
                  <p className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    Booking #{index + 1}
                  </p>

                  <p
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {booking.status}
                  </p>
                </div>

                {/* Rental Period */}
                <div className="flex items-start gap-3 mt-5">
                  <img
                    src={assets.calendar_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Rental Period
                    </p>
                    <p className="text-sm">
                      {booking.pickupDate?.split("T")[0]} →{" "}
                      {booking.returnDate?.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 mt-4">
                  <img
                    src={assets.location_icon_colored}
                    alt=""
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Pick-up Location
                    </p>
                    <p className="text-sm">
                      {booking.car?.location}
                    </p>
                  </div>
                </div>

              </div>

              {/* Price Section */}
              <div className="flex flex-col justify-between items-end text-right">

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Price
                  </p>
                  <h2 className="text-2xl font-bold text-red-600">
                    {currency}
                    {booking.price}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Booked on{" "}
                    {booking.createdAt?.split("T")[0]}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyBookings;
