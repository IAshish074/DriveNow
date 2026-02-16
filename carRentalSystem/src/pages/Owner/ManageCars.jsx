import React, { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  useEffect(() => {
    setCars(dummyCarData);
  }, []);

  /* ===== Toggle Availability ===== */
  const toggleAvailability = (index) => {
    const updated = [...cars];
    updated[index].isAvaliable = !updated[index].isAvaliable;
    setCars(updated);
  };

  /* ===== Delete Car ===== */
  const deleteCar = (index) => {
    const updated = cars.filter((_, i) => i !== index);
    setCars(updated);
  };

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50
                    px-4 sm:px-6 md:px-10
                    pt-24 md:pt-28 pb-10 overflow-y-auto">

      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them."
      />

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4 mt-6">
        {cars.map((car, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <img
                src={car.image}
                alt=""
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">
                  {car.brand} {car.model}
                </p>
                <p className="text-xs text-gray-500">
                  {car.seating_capacity} Seats • {car.transmission}
                </p>
                <p className="text-sm font-medium mt-1">
                  {currency}{car.pricePerDay}/day
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    car.isAvaliable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {car.isAvaliable ? "Available" : "Unavailable"}
              </span>

              <div className="flex gap-3">
                <img
                  src={
                    car.isAvaliable
                      ? assets.eye_close_icon
                      : assets.eye_icon
                  }
                  alt=""
                  onClick={() => toggleAvailability(index)}
                  className="cursor-pointer h-5"
                />
                <img
                  src={assets.delete_icon}
                  alt=""
                  onClick={() => deleteCar(index)}
                  className="cursor-pointer h-5"
                />
              </div>
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
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} Seats • {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-4">{car.category}</td>

                <td className="p-4 font-medium">
                  {currency}{car.pricePerDay}/day
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        car.isAvaliable
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {car.isAvaliable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="p-4 flex items-center gap-4">
                  <img
                    src={
                      car.isAvaliable
                        ? assets.eye_close_icon
                        : assets.eye_icon
                    }
                    alt=""
                    onClick={() => toggleAvailability(index)}
                    className="cursor-pointer h-5"
                  />
                  <img
                    src={assets.delete_icon}
                    alt=""
                    onClick={() => deleteCar(index)}
                    className="cursor-pointer h-5"
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ManageCars;
