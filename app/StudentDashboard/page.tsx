import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardPages from "@/components/student_admin/dashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login
  if (!session || !session.user) {
    redirect("/login");
  }

  return <DashboardPages />;
}
