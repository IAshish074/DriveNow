import React, { useState, useEffect } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  useEffect(() => {
    setBookings(dummyMyBookingsData);
  }, []);

  const handleStatusChange = (index, value) => {
    const updated = [...bookings];
    updated[index].status = value;
    setBookings(updated);
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50
                    px-4 sm:px-6 md:px-10
                    pt-24 md:pt-28 pb-10 overflow-y-auto">

      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings and manage statuses"
      />

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4 mt-6">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <img
                src={booking.car.image}
                alt=""
                className="h-14 w-14 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">
                  {booking.car.brand} {booking.car.model}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span className="font-medium">
                {currency}{booking.price}
              </span>

              {booking.status === "pending" ? (
                <select
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(index, e.target.value)
                  }
                  className="px-2 py-1 border rounded-md text-xs"
                >
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                  {booking.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block mt-6 bg-white rounded-xl shadow-sm border overflow-x-auto">

        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="p-4 font-medium">Car</th>
              <th className="p-4 font-medium">Date Range</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Payment</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <p className="font-medium">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>

                <td className="p-4">
                  {booking.pickupDate.split("T")[0]} →{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                <td className="p-4 font-medium">
                  {currency}{booking.price}
                </td>

                <td className="p-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    Offline
                  </span>
                </td>

                <td className="p-4">
                  {booking.status === "pending" ? (
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="px-2 py-1 border rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ManageBookings;
