import React from 'react'
import Hero from '../components/Hero'
import FeaturesSection from '../components/featuresSection'
import { Banner } from '../components/Banner'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'


const Home = () => {
  return (
    <div className="bg-white">

     
      <Hero />
      <FeaturesSection />
      <Banner />
      <Testimonials />
      <NewsLetter />
    

    </div>
  )
}

export default Home
