import React from "react";
import SideBar from "../../components/owner/SideBar";
import NavbarOwner from "../../components/owner/NavbarOwner";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Top Navbar */}
      <NavbarOwner />

      {/* Main Section */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <SideBar />

        {/* Page Content */}
        <div
          className="
          flex-1
          p-4 md:p-6
          md:ml-64
          pb-16 md:pb-6
          "
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;
