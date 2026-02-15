import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Hero = () => {

  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!pickupLocation || !pickupDate || !returnDate) {
      alert("Please fill all fields")
      return
    }

    if (returnDate < pickupDate) {
      alert("Return date cannot be before pickup date")
      return
    }

    console.log({
      pickupLocation,
      pickupDate,
      returnDate
    })
  }

  return (
    <div className="
      min-h-screen
      flex flex-col items-center justify-center
      gap-12
      bg-white
      text-black
      px-6
      text-center
    ">

      {/* Heading */}
      <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
        Luxury Cars on Rent
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='
          flex flex-col md:flex-row
          items-center
          gap-6
          bg-white
          justify-between
          text-gray-700
          p-4 md:p-6
          rounded-xl md:rounded-full
          w-full max-w-5xl
          shadow-lg
        '
      >

        {/* Pickup Location */}
        <div className='flex flex-col items-start gap-2'>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
            className="w-56 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Pickup Location</option>
            {cityList.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <p className='text-gray-500 text-sm mx-2'>
            {pickupLocation || "Please select location"}
          </p>
        </div>

        {/* Pickup Date */}
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor="pickup-date" className="text-sm font-medium">
            Pick-up Date
          </label>
          <input
            type="date"
            id="pickup-date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={today}
            required
            className="px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Return Date */}
        <div className='flex flex-col items-start gap-2'>
          <label htmlFor="return-date" className="text-sm font-medium">
            Return Date
          </label>
          <input
            type="date"
            id="return-date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || today}
            required
            className="px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className='w-4 brightness-200'
          />
          Search
        </button>

      </form>

      {/* Car Image */}
      <img
        src={assets.main_car}
        alt="car"
        className='w-full max-w-3xl object-contain'
      />

    </div>
  )
}

export default Hero
