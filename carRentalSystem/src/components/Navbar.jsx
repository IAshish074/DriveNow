import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";   // ✅ FIXED

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
  } = useAppContext();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const changeRole = async () => {
    try {
      const { data } = await axios.post(
        "/api/owner/change-role"
      );

      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsOwner(false);   // ✅ ensure owner reset
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.div
        initial={{ y: -20 , opacity:0 }}
        animate={{ y: 0 , opacity:1}}
        transition={{ duration: 0.5 }}
        className="w-full fixed top-0 left-0 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md z-50"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">

          {/* Logo */}
          <NavLink to="/">
            <motion.img 
            whileHover={{scale:1.05}}
            
            src={assets.logo} alt="logo" className="h-8" />
          </NavLink>

          {/* ===== DESKTOP ===== */}
          <div className="hidden md:flex items-center gap-8">

            {menuLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "hover:text-red-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Owner Button */}
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : changeRole()
              }
              className={`px-4 py-1.5 rounded-full border border-white/70 transition ${
                location.pathname.startsWith("/owner")
                  ? "bg-white text-red-600"
                  : "hover:bg-white/10"
              }`}
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>

            {/* Login / Logout */}
            {user ? (
              <div className="flex items-center gap-4">

                <span className="text-sm">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-full bg-white text-red-600 font-medium hover:bg-red-100 transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-1.5 rounded-full bg-white text-red-600 font-medium hover:bg-red-100 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* ===== MOBILE BUTTON ===== */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.div>

      {/* ===== MOBILE DRAWER ===== */}
      <div
        className={`fixed inset-0 z-40 transition-all ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-red-700 text-white p-6 transform transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-6">
            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6">

            {menuLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-red-200"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <hr className="border-red-500" />

            {/* Owner Button */}
            <button
              onClick={() => {
                setOpen(false);
                isOwner
                  ? navigate("/owner")
                  : changeRole();
              }}
              className="px-4 py-2 rounded-full border border-white/70 hover:bg-white/10 transition"
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-full bg-white text-red-600 font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogin(true);
                }}
                className="px-4 py-2 rounded-full bg-white text-red-600 font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
