'use client'
import Update_Test_Series from '@/components/test-pages/Update_Test_Series'
import React from 'react'
import { useState ,useEffect} from 'react';
import Sidebar from '@/components/student_admin/Sidebar'
import Navbar from '@/components/student_admin/Navbar'
const page = () => {
    const [testSeries,setTestSeries] = useState(null);
      useEffect(() => {
  const data = localStorage.getItem('itemToEdit');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed itemToEdit:', parsed);
      setTestSeries(parsed);
    } catch (err) {
      console.error('Invalid JSON from localStorage:', err);
    }
  }
}, []);
  return (
    <div className="flex h-screen overflow-hidden">
          {/* Fixed Sidebar */}
          <div className="w-[305px] hidden md:block fixed top-0 left-0 h-full z-30">
            <Sidebar/>
          </div>
    
          {/* Main Content Wrapper */}
          <div className="flex flex-col flex-1 md:ml-[305px] h-full overflow-y-auto">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {testSeries && <Update_Test_Series data={testSeries}/>}
            </main>
          </div>
        </div>
  )
}

export default page