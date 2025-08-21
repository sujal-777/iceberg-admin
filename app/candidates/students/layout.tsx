import type React from "react"
// Removed unused auth imports
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default async function StudentLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  // const session = await getServerSession(authOptions)

  // if (!session || !session.user) {
  //   redirect("/login")
  // }

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
          <StudentBreadcrumb studentId={params.id} />
          {children}
        </main>
      </div>
    </div>
  )
}

function StudentBreadcrumb({ studentId }: { studentId: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <Link href="/dashboard" className="hover:text-blue-600">
        Dashboard
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/dashboard" className="hover:text-blue-600">
        Students
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="font-medium text-gray-900">Student Details</span>
    </div>
  )
}
