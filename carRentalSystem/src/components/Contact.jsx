import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <footer className="bg-white text-gray-600 px-6 md:px-16 lg:px-24 xl:px-32 pt-16">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-300">

        {/* Logo + Description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32" />
          <p className="mt-5 text-sm leading-6">
            Premium car rental services with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <img src={assets.facebook_logo} alt="facebook" className="w-5 h-5 hover:scale-110 transition" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img src={assets.instagram_logo} alt="instagram" className="w-5 h-5 hover:scale-110 transition" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer">
              <img src={assets.twitter_logo} alt="twitter" className="w-5 h-5 hover:scale-110 transition" />
            </a>
            <a href="https://mail.google.com/" target="_blank" rel="noreferrer">
              <img src={assets.gmail_logo} alt="gmail" className="w-5 h-5 hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red-600 transition">Home</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Browse Cars</a></li>
            <li><a href="#" className="hover:text-red-600 transition">List Your Car</a></li>
            <li><a href="#" className="hover:text-red-600 transition">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-600 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-600 transition">Insurance</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <div className="text-sm space-y-2">
            <p>+91 9508709274</p>
            <p>amishrahsm@gmail.com</p>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="py-6 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} CarRental. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Contact
