import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg";

const Navbar = ({ openSideMenu, setOpenSideMenu }) => {
  return (
    <div className="flex items-center justify-between bg-white border-b border-slate-200 px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Taskio Logo" className="h-8 w-8 object-contain" />
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
          Taskio
        </h1>
      </div>

      <h2 className="hidden md:block text-lg font-medium text-slate-600">
        Task Manager
      </h2>

      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-slate-700"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        
      </div>
    </div>
  );
};

export default Navbar;
