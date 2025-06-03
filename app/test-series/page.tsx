// 'use client'
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// // import DashboardPages from "@/components/student_admin/dashboard";
// import Navbar from "@/components/student_admin/Navbar";
// import Sidebar from "@/components/student_admin/Sidebar";
// // import TestSeriesPage from "@/components/test-pages/testList";
// import TestSeriesDashboard from "@/components/test-pages/testList";
// import { useEffect,useState } from "react";
// export default async function Dashboard() {
//   const [newtestDetails,setNewtestDetails]=useState(null);
 
// useEffect(()=>{
//   const data=localStorage.getItem('formData')
//   if(data){
//     setNewtestDetails(JSON.parse(data));
//   }
// },[])
// useEffect(()=>{
//   console.log('new test series data',newtestDetails)
// },[newtestDetails])

//  const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     redirect("/login");
//   }
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Fixed Sidebar */}
//       <div className="w-[305px] hidden md:block fixed top-0 left-0 h-full z-30">
//         <Sidebar/>
//       </div>

//       {/* Main Content Wrapper */}
//       <div className="flex flex-col flex-1 md:ml-[305px] h-full overflow-y-auto">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
//           <TestSeriesDashboard />
//         </main>
//       </div>
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TestSeriesPageClient from "./TestSeriesPageClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  return <TestSeriesPageClient />;
}
