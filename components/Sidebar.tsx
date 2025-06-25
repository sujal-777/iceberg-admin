"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Play,
  Headphones,
  Menu,
  X,
  GraduationCap,
  LaptopMinimalCheck,
  Contact,
} from "lucide-react";
import { FaBlog } from "react-icons/fa6";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/StudentDashboard" },
  { id: "candidate-management", label: "Candidate Management", icon: Users, path: "/candidates" },
  { id: "test-series", label: "Test Series", icon: FileText, path: "/test-series" },
  { id: "concept-video", label: "Concept Video", icon: Play, path: "/ConceptVideos" },
  { id: "counseling", label: "Counseling Session", icon: GraduationCap, path: "/counseling" },
  { id: "jobApplication", label : "Job Application", icon: LaptopMinimalCheck, path: "jobApplication" },
  { id: "contactForm", label : "Contact Details", icon: Contact, path: "contact" },
  { id: "blogForm", label : "Blog Forms", icon: FaBlog, path: "blog-management" }
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
        } md:block fixed md:relative z-20 w-[305px] h-screen top-0 left-0 bg-white rounded-none md:rounded-[20px] shadow-md flex flex-col justify-between transition-transform ease-in-out duration-300`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="py-6 px-4">
            <h1 className="font-space-grotesk font-bold text-[36px] text-center bg-gradient-to-r from-[#00BBFF] to-[#0048B0] bg-clip-text text-transparent">
              ICEBERG
            </h1>
          </div>

          {/* Menu */}
          <nav className="px-4 space-y-2 font-inter">
            {menuItems.map(({ id, label, icon: Icon, path }) => {
              const isActive = pathname === path;
              return (
                <button
                  key={id}
                  onClick={() => {
                    router.push(path);
                    setIsOpen(false); // close on mobile
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-black hover:bg-[#0048B0] hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-4 py-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
            <Headphones className="h-5 w-5 text-black" />
            <span className="font-inter font-semibold text-[16px]">
              Support Center
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
