import Create_new_test_series from '@/components/test-pages/Create_new_test_series'
import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
const page = () => {
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
             <Create_new_test_series/>
            </main>
          </div>
        </div>
  )
}

export default page