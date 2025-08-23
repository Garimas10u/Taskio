import React, { useState, useEffect, useContext } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";

const SideMenu = ({ activeMenu, setOpenSideMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "Logout") {
      handleLogout();
      return;
    }
    navigate(route);
    if (setOpenSideMenu) setOpenSideMenu(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    if (setOpenSideMenu) setOpenSideMenu(false);
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={() => setOpenSideMenu(false)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <HiOutlineX className="text-2xl text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center pb-6 pt-2 bg-blue-100">
        <div className="relative">
          <img
            src={user?.profileImageUrl || "ProfileImage"}
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[11px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-0.5 rounded-full mt-2 shadow">
            Admin
          </div>
        )}

        <h5 className="text-gray-900 font-semibold text-base mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-sm text-blue-900/90">{user?.email || ""}</p>
      </div>

      <div className="flex-1 px-2 bg-blue-100">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-4 rounded-xl mb-2 transition-all duration-200 ${
              activeMenu === item.label
                ? "text-white bg-gradient-to-r from-blue-600 to-blue-900/70 shadow-md"
                : "text-blue-900 hover:bg-blue-800/10"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
