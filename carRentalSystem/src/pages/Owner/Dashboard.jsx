import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {

  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completeBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completeBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");

      if (data.success) {
        // 🔥 use correct key based on backend
        setData(data.dashboardData || data.getDashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);   // ✅ fixed typo

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50
                    px-4 sm:px-6 md:px-10
                    pt-24 md:pt-28 pb-10">

      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                      gap-5 sm:gap-6 mt-8">

        {dashboardCards.map((card, index) => (
          <div key={index}
            className="flex items-center justify-between gap-4
                       p-5 sm:p-6 bg-white rounded-xl border
                       shadow-sm hover:shadow-md transition">

            <div>
              <h1 className="text-xs sm:text-sm text-gray-500 uppercase">
                {card.title}
              </h1>
              <p className="text-xl sm:text-2xl font-bold">
                {card.value}
              </p>
            </div>

            <div className="w-11 h-11 sm:w-12 sm:h-12
                            rounded-full bg-red-50 flex items-center justify-center">
              <img
                src={card.icon}
                alt="icon"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10">

        {/* ===== Recent Bookings ===== */}
        <div className="bg-white p-4 md:p-6 rounded-xl border shadow-sm w-full lg:w-2/3">

          <h1 className="text-lg font-semibold">Recent Bookings</h1>
          <p className="text-gray-500 text-sm">Latest customer bookings</p>

          <div className="mt-4 space-y-4">

            {data.recentBookings?.length > 0 ? (
              data.recentBookings.map((booking, index) => (
                <div key={index}
                  className="flex flex-col sm:flex-row sm:items-center
                             sm:justify-between gap-3 border-b pb-3">

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex w-12 h-12
                                    rounded-full bg-gray-100
                                    items-center justify-center">
                      <img
                        src={assets.listIconColored}
                        alt=""
                        className="h-5 w-5"
                      />
                    </div>

                    <div>
                      <p className="font-medium">
                        {booking.car?.brand} {booking.car?.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.createdAt
                          ? booking.createdAt.split("T")[0]
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">
                      {currency}{booking.price}
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400 mt-4">
                No recent bookings available
              </p>
            )}

          </div>
        </div>

        {/* ===== Monthly Revenue ===== */}
        <div className="bg-white p-6 rounded-xl border shadow-sm w-full lg:w-1/3">
          <h1 className="text-lg font-semibold">Monthly Revenue</h1>
          <p className="text-gray-500 text-sm mb-4">
            Total revenue this month
          </p>

          <div className="text-3xl font-bold text-red-600">
            {currency}{data.monthlyRevenue}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
