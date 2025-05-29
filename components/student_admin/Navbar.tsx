'use client'
import { FC, useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";  // <-- import useRouter
import { FiSearch, FiSettings, FiBell } from "react-icons/fi";

const Navbar: FC = () => {
  const router = useRouter();  // <-- initialize router
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowLogoutPopup(false);
      }
    }
    if (showLogoutPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutPopup]);

  const handleLogout = () => {
    // Redirect to login page on logout
    setShowLogoutPopup(false);
    router.push("/login");
  };

  const formattedDate = useMemo(() => {
    const date = new Date();

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${day < 10 ? `0${day}` : day} ${month}, ${year} ${hours}:${minutesStr} ${ampm}`;
  }, []);

  return (
    <nav className="w-full bg-[#F6F7FA] flex justify-center">
      <div className="w-[1513px] h-[65px] bg-white rounded-[10px] border border-[#E5E7EB] flex items-center px-[26px] shadow-sm">
        {/* Search Bar */}
        <div className="w-[464px] h-[45px] top-[10px] rounded-[10px] pt-[13px] pr-[15px] pb-[13px] pl-[15px] gap-[10px] absolute flex border border-[#E5E7EB] px-[15px] py-[13px]">
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
          {formattedDate}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-[24px] mr-8">
          <FiSettings className="text-gray-500 text-xl cursor-pointer" />
          <FiBell className="text-gray-500 text-xl cursor-pointer" />
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#E5E7EB] mx-4" />

        {/* User Info */}
        <div
          ref={profileRef}
          className="flex items-center gap-3 relative cursor-pointer select-none"
          onClick={() => setShowLogoutPopup((prev) => !prev)}
        >
          <img
            src="./adminprofile.png"
            alt="Jay Vasani"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-gray-900 font-semibold text-sm">Jay Vasani</div>
            <div className="text-gray-400 text-xs">Admin</div>
          </div>

          {showLogoutPopup && (
            <div className="absolute right-0 top-full mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
