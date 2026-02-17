import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const {user} =  useAppContext()

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 bg-red-600 text-white shadow-md">
      
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-8 cursor-pointer"
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <p className="text-sm md:text-base">
          Welcome,{" "}
          <span className="font-semibold">
            {user?.name || "Owner"}
          </span>
        </p>

        <img
          src={user?.image || assets.profile_icon}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-white"
        />
      </div>
    </div>
  );
};

export default NavbarOwner;
