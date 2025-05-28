"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Play,
  Headphones,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "candidate-management", label: "Candidate Management", icon: Users },
  { id: "test-series", label: "Test Series", icon: FileText },
  { id: "concept-video", label: "Concept Video", icon: Play },
];

export default function Sidebar({ activeItem, onItemSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <h1 className="text-xl font-bold text-blue-500">ICEBERG</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block fixed md:relative z-20 max-w-[305px] h-[933px] top-[33px] left-[25px] bg-gray-100 rounded-[20px]  pt-[11px] pb-[11px] bg-whiteflex flex-col transition-transform ease-in-out duration-300` }
      >
        {/* Logo */}
        <div className=" max-w-[305px] max-h-[54px] gap-2  rounded-lg">
          <h1 className="font-space-grotesk font-bold text-[36px] leading-[1] tracking-normal text-center  bg-gradient-to-r from-[#00BBFF] to-[#0048B0] bg-clip-text text-transparent">
            ICEBERG
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-hidden px-4 py-6 ">
          <ul className="space-y-2 font-inter">
            {menuItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeItem === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      onItemSelect(id);
                      setIsOpen(false); // close on mobile select
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-black hover:bg-[#0048B0]"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? "text-white" : "text-"
                      }`}
                    />
                    <span className="font-medium">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Support Center */}
        <div className="max-w-[254px] h-[40px] rounded-[10px] pt-[9px] pr-[21px] pb-[9px] pl-[21px] flex gap-[10px] mt-[550px]">
          <button className=" max-w-[212px]  h-[22px] gap-[11px] flex items-center  px-4 py-3 text-black hover:bg-gray-200 rounded-lg transition-all duration-200">
            <Headphones className="h-5 w-5 text-black" />
            <span className=" font-inter font-semibold text-[16px] leading-[1] tracking-normal font-inter">Support Center</span>
          </button>
        </div>
      </div>
    </>
  );
}
