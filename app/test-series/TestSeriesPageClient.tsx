'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TestSeriesDashboard from "@/components/test-pages/testList";

export default function TestSeriesPageClient() {
  // const [newTestDetails, setNewTestDetails] = useState(null);

  // useEffect(() => {
  //   const data = localStorage.getItem("formData");
  //   if (data) {
  //     setNewTestDetails(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("new test series data", newTestDetails);
  // }, [newTestDetails]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-[305px] hidden md:block fixed top-0 left-0 h-full z-30">
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 md:ml-[305px] h-full overflow-y-auto">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <TestSeriesDashboard />
        </main>
      </div>
    </div>
  );
}
