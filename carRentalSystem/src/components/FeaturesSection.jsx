import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCards from './CarCards'
import { useNavigate } from 'react-router-dom'

const FeaturesSection = () => {
    const navigate = useNavigate()
  return (
    <section className="
      bg-gray-50
      py-20
      px-6 md:px-16 lg:px-24 xl:px-32
    ">

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventures."
        />
      </div>

      {/* Cards Grid */}
      <div className="
        mt-16
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">
        {dummyCarData.slice(0, 6).map((car) => (
          <CarCards key={car._id} car={car} />
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-16">
        <button 
        onClick={()=>{
            navigate('/cars');
            scrollTo(0,0)
        }}
        className="
          flex items-center gap-2
          px-8 py-3
          bg-red-600
          text-white
          rounded-full
          hover:bg-red-700
          transition
          shadow-md
        ">
          Explore all cars
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="w-4 brightness-200"
          />
        </button>
      </div>

    </section>
  )
}

export default FeaturesSection
