import AddBlogForm from "@/components/blogParts/add-blog-form"
// import BlogManagement from "@/components/blogParts/blog-management"
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import DashboardPages from "@/components/student_admin/dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default async function AddBlogPAGE() {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/login");
  // }

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
          <AddBlogForm />
        </main>
      </div>
    </div>
  );
}
