import React, { useState, useMemo } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCards from '../components/CarCards'

const Cars = () => {

  const [input, setInput] = useState("")

  // 🔎 Filter Logic
  const filteredCars = useMemo(() => {
    return dummyCarData.filter(car =>
      `${car.brand} ${car.model} ${car.category} ${car.fuel_type}`
        .toLowerCase()
        .includes(input.toLowerCase())
    )
  }, [input])

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header Section */}
      <div className="flex flex-col items-center py-20 px-6">

        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure."
        />

        {/* Search Bar */}
        <div className="
          flex items-center
          bg-white
          px-5
          mt-8
          w-full max-w-2xl
          h-14
          rounded-full
          shadow-md
        ">

          <img src={assets.search_icon} alt="search" className="w-4 h-4 mr-3 opacity-60" />

          <input
            type="text"
            placeholder="Search by make, model, or features"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />

          <img src={assets.filter_icon} alt="filter" className="w-4 h-4 opacity-60" />
        </div>

      </div>

      {/* Cars Grid Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pb-20">

        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Showing {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"}
        </p>

        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">

          {filteredCars.map((car) => (
            <CarCards key={car._id} car={car} />
          ))}

        </div>

      </div>

    </div>
  )
}

export default Cars
