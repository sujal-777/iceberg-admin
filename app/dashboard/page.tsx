import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard-page";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Transform user object: convert nulls to undefined
  const safeUser = {
    name: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    image: session.user.image ?? undefined,
  };

  return (
    <div className="p-8">
      <DashboardPage user={safeUser} />
    </div>
  );
}
