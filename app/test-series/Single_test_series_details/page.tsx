'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Adding_questions from '@/components/test-pages/Adding_questions'
import { useEffect } from 'react'
type TestSeriesItem = {
  _id: string;
  title: string;
  examId: string;
  questions: number;
  duration: string;
  createdAt: string;
  testSeriesId: string;
};

const page = () => {
   const [testSeries,setTestSeries] = useState<TestSeriesItem | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('testseriesData');
    console.log('data',data)
    if (data) {
      setTestSeries(JSON.parse(data));
    }
  }, []);
  useEffect(()=>{
    console.log('single data:',testSeries)
  },[testSeries])
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
             {testSeries && <Adding_questions data={testSeries}/>} 
            </main>
          </div>
        </div>
  )
}

export default page