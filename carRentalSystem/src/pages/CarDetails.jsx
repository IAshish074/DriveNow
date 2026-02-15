import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY
  const today = new Date().toISOString().split("T")[0]


  const handleSubmit = async(e)=>{
    e.preventDefault()
  }

  useEffect(() => {
    const selectedCar = dummyCarData.find(car => car._id === id)
    setCar(selectedCar)
  }, [id])

  if (!car) return <Loader />

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-20'>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-8 mt-8 text-gray-500 hover:text-red-600 transition'
      >
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-70 w-4' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>

        {/* Left Section */}
        <div className='lg:col-span-2'>

          <img
            src={car.image}
            alt=""
            className='w-full h-auto rounded-2xl shadow-lg mb-8'
          />

          <div className='space-y-8'>

            {/* Title */}
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
                {car.brand} {car.model}
              </h1>
              <p className='text-gray-500 text-lg mt-1'>
                {car.category} • {car.year}
              </p>
            </div>

            <hr />

            {/* Specs */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location }
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center bg-gray-50 p-4 rounded-xl text-center'
                >
                  <img src={item.icon} alt="" className='h-5 mb-2 opacity-70' />
                  <span className='text-sm text-gray-600'>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className='text-xl font-semibold mb-3'>Description</h2>
              <p className='text-gray-600 leading-relaxed'>
                {car.description}
              </p>
            </div>

            {/* Features */}
            <div className='mb-3'> 
              <h2 className='text-xl font-semibold mb-3'>Features</h2>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror"
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center text-gray-600'
                  >
                    <img src={assets.check_icon} alt="" className='h-4 mr-2' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Right Section - Booking Card */}
        <form className='bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-24'>

            <p
            className='flex items-center justify-between text-2xl text-gray-800 font-semibold'
            >{currency}{car.pricePerDay}<span className='text-base text-gray-400 font-normal'>per day</span></p> 

            <hr className='border-black my-6'/>

            <div className='flex flex-col gap-2'>
                <label htmlFor="pickup-date">Pickup Date</label>
                <input type="date" id="pickup-date"  className='border border-black px-3 py-2 rounded' min={today} required/>

            </div>

            <div className='flex flex-col gap-2 mt-6'>
                <label htmlFor="return-date">Return date</label>
                <input type="date" id="return-date"  className='border border-black px-3 py-2 rounded'  required/>

            </div>

          <button
          onClick={handleSubmit}
          className='mt-6 mb-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition cursor-pointer'>
            Book Now
          </button>

          <p className='text-center text-sm'>No credit card required to reserve</p>

        </form>

      </div>

    </div>
  )
}

export default CarDetails
