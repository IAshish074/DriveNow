import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCards = ({ car }) => {

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  return (
    <div
    onClick={()=> {navigate(`/car-details/${car._id}`);scrollTo(0,0)}}
    className="
      group
      bg-white
      rounded-2xl
      overflow-hidden
      shadow-md
      hover:shadow-xl
      transition-all duration-500
      hover:-translate-y-2
      cursor-pointer
    ">

      {/* Image Section */}
      <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">

        <img
          src={car.image}
          alt="Car"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Availability Badge */}
        {car.isAvailable && (
          <span className="
            absolute top-4 left-4
            bg-red-600
            text-white
            text-xs
            px-3 py-1
            rounded-full
            shadow-md
          ">
            Available Now
          </span>
        )}

        {/* Price Badge */}
        <div className="
          absolute bottom-4 right-4
          bg-black/80 backdrop-blur-sm
          text-white
          px-4 py-2
          rounded-xl
          text-sm
          shadow-md
        ">
          <span className="font-semibold">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-white/80"> /day</span>
        </div>

      </div>

      {/* Content Section */}
      <div className="p-5">

        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            {car.brand} {car.model}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {car.category} • {car.year}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="
          grid grid-cols-2
          gap-y-3
          text-gray-600
          text-sm
        ">

          <div className="flex items-center">
            <img src={assets.users_icon} alt="" className="h-4 mr-2 opacity-70" />
            {car.seating_capacity} Seats
          </div>

          <div className="flex items-center">
            <img src={assets.fuel_icon} alt="" className="h-4 mr-2 opacity-70" />
            {car.fuel_type}
          </div>

          <div className="flex items-center">
            <img src={assets.car_icon} alt="" className="h-4 mr-2 opacity-70" />
            {car.transmission}
          </div>

          <div className="flex items-center">
            <img src={assets.location_icon} alt="" className="h-4 mr-2 opacity-70" />
            {car.location}
          </div>

        </div>

      </div>

    </div>
  )
}

export default CarCards
