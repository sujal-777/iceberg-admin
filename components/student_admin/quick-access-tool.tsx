import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  UserPlus, 
  Calendar, 
  BarChart2 
} from "lucide-react";

interface QuickAccessToolProps {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

function QuickAccessTool({ title, icon, bgColor }: QuickAccessToolProps) {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className={`rounded-full ${bgColor} p-4 mb-3`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  );
}

export default function QuickAccessTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium ">Quick Access Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 ">
          <QuickAccessTool
            title="Create Test"
            icon={<FileText className="h-5 w-5 text-blue-500" />}
            bgColor="bg-blue-50"
          />
          <QuickAccessTool
            title="Add Student"
            icon={<UserPlus className="h-5 w-5 text-blue-500" />}
            bgColor="bg-blue-50"
          />
          <QuickAccessTool
            title="Schedule Session"
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
            bgColor="bg-blue-50"
          />
          <QuickAccessTool
            title="Generate Report"
            icon={<BarChart2 className="h-5 w-5 text-blue-500" />}
            bgColor="bg-blue-50"
          />
        </div>
      </CardContent>
    </Card>
  );
}