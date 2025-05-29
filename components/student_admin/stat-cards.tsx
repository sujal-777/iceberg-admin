import { 
  TrendingUp, 
  Percent, 
  Award, 
  BookOpen, 
  Users, 
  BarChart3, 
  FileText 
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{value}</h3>
          <p className={`mt-1 text-sm ${changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
            {changeType === "increase" ? "↑" : "↓"} {change}
          </p>
        </div>
        <div className="rounded-full bg-blue-50 p-3">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value="2,835"
        change="8.3% from last month"
        changeType="increase"
        icon={<Users className="h-6 w-6 text-blue-500" />}
      />
      <StatCard
        title="Pass Rate"
        value="68.5%"
        change="2.6% from last session"
        changeType="increase"
        icon={<Percent className="h-6 w-6 text-blue-500" />}
      />
      <StatCard
        title="Average Score"
        value="72.7"
        change="1.5% points increase"
        changeType="increase"
        icon={<Award className="h-6 w-6 text-blue-500" />}
      />
      <StatCard
        title="Active Test Series"
        value="18"
        change="3 new this week"
        changeType="increase"
        icon={<FileText className="h-6 w-6 text-blue-500" />}
      />
    </div>
  );
}