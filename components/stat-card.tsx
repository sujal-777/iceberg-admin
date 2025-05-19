import { ArrowDown, ArrowUp, BarChart3, FileText, Percent, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: "students" | "percentage" | "chart" | "document"
  color: "blue" | "green" | "red" | "yellow"
}

export function StatCard({ title, value, change, trend, icon, color }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "students":
        return <Users className="h-5 w-5" />
      case "percentage":
        return <Percent className="h-5 w-5" />
      case "chart":
        return <BarChart3 className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              {trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change}</span>
            </div>
          </div>
          <div className={`p-2 rounded-full bg-blue-100`}>{getIcon()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
