import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

    if (isLoading) return;

    if (!image) {
      toast.error("Please upload car image");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post(
        "/api/owner/add-car",
        formData
      );

      if (data.success) {
        toast.success("Car Listed Successfully");

        setImage(null);
        setCar({
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 text-gray-600 text-sm mt-6 max-w-5xl"
      >
        {/* Image Upload */}
        <div className="flex items-center gap-4">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_icon
              }
              alt="upload"
              className="h-20 w-20 object-cover rounded border"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </label>
          <p className="text-gray-500">
            Upload car image
          </p>
        </div>

        {/* Brand & Model */}
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

        {/* Year, Price, Category */}
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

        {/* Transmission, Fuel, Seating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SelectField
            label="Transmission"
            value={car.transmission}
            options={["Automatic", "Manual", "Semi-Automatic"]}
            onChange={(val) =>
              setCar({ ...car, transmission: val })
            }
          />

          <SelectField
            label="Fuel Type"
            value={car.fuel_type}
            options={["Petrol", "Diesel", "Electric", "Hybrid"]}
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

        {/* Location */}
        <SelectField
          label="Location"
          value={car.location}
          options={[
            "Delhi",
            "Mumbai",
            "Bangalore",
            "Chandigarh",
          ]}
          onChange={(val) =>
            setCar({ ...car, location: val })
          }
        />

        {/* Description */}
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            rows={4}
            required
            value={car.description}
            onChange={(e) =>
              setCar({
                ...car,
                description: e.target.value,
              })
            }
            className="px-3 py-2 mt-1 border rounded-md outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 mt-4
                     bg-red-600 hover:bg-red-700
                     disabled:opacity-50
                     text-white rounded-md font-medium transition"
        >
          <img src={assets.tick_icon} alt="tick" />
          {isLoading ? "Listing..." : "List Your Car"}
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
