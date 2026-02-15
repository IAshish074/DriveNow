import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets.js'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from "lucide-react"

const Navbar = ({ setShowLogin }) => {

  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="w-full fixed top-0 left-0 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md z-50">

      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to='/'>
          <img 
            src={assets.logo} 
            alt="logo" 
            className='h-8 brightness-0 invert'
          />
        </Link>

        {/* Desktop Section */}
        <div className="hidden md:flex items-center gap-8">

          {/* Nav Links */}
          {menuLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.path}
              className={`transition
                ${location.pathname === link.path 
                  ? "text-yellow-300 font-semibold" 
                  : "hover:text-red-200"}
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* Search */}
          <div className='hidden lg:flex items-center text-sm gap-2 
            border border-red-400 px-4 py-1.5 rounded-full 
            bg-red-500/30 backdrop-blur-sm'>

            <input 
              type="text"
              className='bg-transparent outline-none placeholder-red-200 text-white w-40'
              placeholder='Search products'
            />

            <img 
              src={assets.search_icon} 
              alt="search"
              className='h-4 brightness-0 invert'
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate('/owner')}
              className={`px-4 py-1.5 rounded-full border border-white/70 transition
                ${location.pathname === "/owner"
                  ? "bg-white text-red-600"
                  : "hover:bg-white/10"}
              `}
            >
              Dashboard
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-1.5 rounded-full bg-white text-red-600 font-medium hover:bg-red-100 transition"
            >
              Login
            </button>

          </div>

        </div>

        {/* Hamburger */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26}/> : <Menu size={26}/>}
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden absolute top-full left-0 w-full bg-red-700
        flex flex-col gap-6 px-6 py-6 transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}>

        {menuLinks.map((link, index) => (
          <Link 
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className={`transition
              ${location.pathname === link.path 
                ? "text-yellow-300 font-semibold" 
                : "hover:text-red-200"}
            `}
          >
            {link.name}
          </Link>
        ))}

        <hr className="border-red-500"/>

        <button
          onClick={() => {
            navigate('/owner')
            setOpen(false)
          }}
          className={`px-4 py-2 rounded-full border border-white/70 transition
            ${location.pathname === "/owner"
              ? "bg-white text-red-600"
              : "hover:bg-white/10"}
          `}
        >
          Dashboard
        </button>

        <button
          onClick={() => {
            setShowLogin(true)
            setOpen(false)
          }}
          className="px-4 py-2 rounded-full bg-white text-red-600 font-medium hover:bg-red-100 transition"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Navbar
