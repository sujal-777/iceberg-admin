import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"

interface CounsellingSessionProps {
  name: string
  role: string
  time: string
  students: string
  status: "live" | "scheduled" | "completed"
  avatarUrl?: string // <-- Add this line
}

export function CounsellingSession({ name, role, time, students, status }: CounsellingSessionProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="\caclientone.png" />     
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
     
          <p className="text-xs text-gray-500">{role}</p>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span className="mr-3">{time}</span>
            <Users className="h-3 w-3 mr-1" />
            <span>{students}</span>
          </div>
        </div>
      </div>
      {status === "live" ? (
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs h-7">
          Live Now
        </Button>
      ) : (
        <Button variant="outline" size="sm" className="text-xs h-7">
          Scheduled
        </Button>
      )}
    </div>
  )
}
