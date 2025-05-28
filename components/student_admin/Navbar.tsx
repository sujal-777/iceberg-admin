'use client'
import { FC } from "react";
import { FiSearch, FiSettings, FiBell } from "react-icons/fi";

const Navbar: FC = () => {
  return (
    <nav className="w-full bg-[#F6F7FA]   flex justify-center">
      <div className="w-[1513px] h-[65px] bg-white rounded-[10px] border border-[#E5E7EB] flex items-center px-[26px] shadow-sm">
        {/* Search Bar */}
        <div className=" w-[464px] h-[45px] top-[10px] rounded-[10px]  pt-[13px] pr-[15px] pb-[13px] pl-[15px] gap-[10px] absolute flex border border-[#E5E7EB]  px-[15px] py-[13px]  ">
          <FiSearch className="text-gray-400 text-xl rounded-2xl" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-full text-gray-700"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Date */}
        <div className="mr-8 text-gray-600 text-sm font-medium">
          06 May, 2025 09:00 AM
        </div>

        {/* Icons */}
        <div className="flex items-center gap-[24px] mr-8">
          <FiSettings className="text-gray-500 text-xl cursor-pointer" />
          <FiBell className="text-gray-500 text-xl cursor-pointer" />
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#E5E7EB] mx-4" />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="./adminprofile.png"
            alt="Jay Vasani"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-gray-900 font-semibold text-sm">Jay Vasani</div>
            <div className="text-gray-400 text-xs">Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
