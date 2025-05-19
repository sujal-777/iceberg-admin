import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TestSeriesCardProps {
  title: string
  enrolledStudents: string
  testSeries: string
  progress: number
}

export function TestSeriesCard({ title, enrolledStudents, testSeries, progress }: TestSeriesCardProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <BookOpen className="h-5 w-5 text-blue-500" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-xs text-gray-500">Enrolled Students</p>
          <p className="font-medium">{enrolledStudents}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Test Series</p>
          <p className="font-medium">{testSeries}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <p className="text-xs text-gray-500">Overall Progress</p>
          <p className="text-xs font-medium">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Button variant="outline" size="sm" className="w-full">
        Manage Test Series
      </Button>
    </div>
  )
}
