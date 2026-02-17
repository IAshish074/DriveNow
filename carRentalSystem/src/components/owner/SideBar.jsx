import React, { useState, useEffect } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SideBar = () => {
  const { user, axios, fetchUser } = useAppContext();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ===== Update Profile Image =====
  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/owner/update-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUser();
        setImage(null);
        setPreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ===== Handle Image Change =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ===== Cleanup Preview URL =====
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      className="
      fixed md:static
      bottom-0 md:bottom-auto
      left-0
      w-full md:w-64
      bg-white
      border-t md:border-t-0 md:border-r
      flex md:flex-col
      items-center md:items-start
      justify-around md:justify-start
      px-4 md:px-6
      py-2 md:py-8
      md:min-h-screen
      z-50
      "
    >
      {/* ================= Profile Section (Desktop Only) ================= */}
      <div className="hidden md:flex relative flex-col items-center gap-2 w-full">
        <label htmlFor="image" className="relative group cursor-pointer">
          <img
            src={
              preview ||
              user?.image ||
              assets.profile_icon   // fallback image
            }
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-full">
            <img src={assets.edit_icon} alt="edit" className="w-5" />
          </div>
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="absolute top-0 right-10 bg-red-600 text-white p-1 rounded-full shadow-md"
          >
            <img src={assets.check_icon} width={12} alt="save" />
          </button>
        )}

        <p className="mt-2 text-base font-medium text-gray-700">
          {user?.name}
        </p>
      </div>

      {/* ================= Menu Section ================= */}
      <div
        className="
        flex md:flex-col
        items-center md:items-start
        justify-around md:justify-start
        w-full
        md:mt-10
        "
      >
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `
              flex flex-col md:flex-row
              items-center gap-1 md:gap-2
              px-3 py-2
              rounded-md
              transition-all
              text-xs md:text-sm
              ${
                isActive
                  ? "text-red-600 font-medium"
                  : "text-gray-600 hover:text-red-500"
              }
              `
            }
          >
            <img
              src={link.icon}
              alt="icon"
              className="w-5 h-5"
            />
            <span className="hidden md:block">
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
