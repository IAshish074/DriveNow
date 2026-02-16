import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("Car Data:", car);
    console.log("Image:", image);

    // Yaha future me API call laga sakte ho
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing and specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-600 text-sm mt-6 max-w-4xl"
      >
        {/* ================= Image Upload ================= */}
        <div className="flex items-center gap-4">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_icon
              }
              alt="upload"
              className="h-16 w-16 object-cover rounded border"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-gray-500">
            Upload a picture of your car
          </p>
        </div>

        {/* ================= Brand & Model ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Brand"
            value={car.brand}
            onChange={(val) =>
              setCar({ ...car, brand: val })
            }
          />

          <InputField
            label="Model"
            value={car.model}
            onChange={(val) =>
              setCar({ ...car, model: val })
            }
          />
        </div>

        {/* ================= Year Price Category ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InputField
            type="number"
            label="Year"
            value={car.year}
            onChange={(val) =>
              setCar({ ...car, year: val })
            }
          />

          <InputField
            type="number"
            label={`Daily Price (${currency})`}
            value={car.pricePerDay}
            onChange={(val) =>
              setCar({ ...car, pricePerDay: val })
            }
          />

          <SelectField
            label="Category"
            value={car.category}
            options={["Sedan", "SUV", "Van"]}
            onChange={(val) =>
              setCar({ ...car, category: val })
            }
          />
        </div>

        {/* ================= Transmission Fuel Seating ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SelectField
            label="Transmission"
            value={car.transmission}
            options={[
              "Automatic",
              "Manual",
              "Semi-Automatic",
            ]}
            onChange={(val) =>
              setCar({ ...car, transmission: val })
            }
          />

          <SelectField
            label="Fuel Type"
            value={car.fuel_type}
            options={[
              "Gas",
              "Diesel",
              "Petrol",
              "Electric",
              "Hybrid",
            ]}
            onChange={(val) =>
              setCar({ ...car, fuel_type: val })
            }
          />

          <InputField
            type="number"
            label="Seating Capacity"
            value={car.seating_capacity}
            onChange={(val) =>
              setCar({ ...car, seating_capacity: val })
            }
          />
        </div>

        {/* ================= Location ================= */}
        <SelectField
          label="Location"
          value={car.location}
          options={[
            "New York",
            "Los Angeles",
            "Houston",
            "Chicago",
          ]}
          onChange={(val) =>
            setCar({ ...car, location: val })
          }
        />

        {/* ================= Description ================= */}
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            rows={4}
            required
            className="px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-red-400"
            value={car.description}
            onChange={(e) =>
              setCar({
                ...car,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* ================= Submit Button ================= */}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 mt-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium w-max transition"
        >
          <img src={assets.tick_icon} alt="tick" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;

/* ================= Reusable Components ================= */

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <input
      type={type}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <select
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-red-400"
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
