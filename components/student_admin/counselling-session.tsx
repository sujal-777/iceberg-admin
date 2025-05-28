import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users } from "lucide-react";

interface CounselingSessionProps {
  counselor: {
    name: string;
    avatar: string;
    role: string;
  };
  time: string;
  students: number;
  status: "live" | "scheduled";
}

function CounselingSessionCard({ counselor, time, students, status }: CounselingSessionProps) {
  return (
    <div className="mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={counselor.avatar} alt={counselor.name} />
            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{counselor.name}</p>
            <p className="text-xs text-gray-500">{counselor.role}</p>
          </div>
        </div>
        
        {status === "live" ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Live Now</Badge>
        ) : (
          <Badge variant="outline" className="text-gray-500">Scheduled</Badge>
        )}
      </div>
      
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{students} Students</span>
        </div>
      </div>
    </div>
  );
}

export default function CounselingSessions() {
  const sessions = [
    {
      counselor: {
        name: "Dr. Anjali Mehta",
        avatar: "./caclienttwo.png",
        role: "CA Career Guidance Session",
      },
      time: "10:00 AM - 11:30 AM",
      students: 15,
      status: "live" as const,
    },
    {
      counselor: {
        name: "Prof. Rajesh Kumar",
        avatar: "./caclientone.png",
        role: "CS Exam Preparation Strategy",
      },
      time: "01:00 PM - 03:30 PM",
      students: 12,
      status: "scheduled" as const,
    },
    {
      counselor: {
        name: "CA Sunita Agarwal",
        avatar: "./caclienttwo.png",
        role: "CA Final Doubt Clearing Session",
      },
      time: "04:30 PM - 06:00 PM",
      students: 18,
      status: "scheduled" as const,

    },
  ];

  return (
    <Card className="h-full ">
      <CardHeader>
        <CardTitle className="text-base font-medium">Today's Counseling Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <CounselingSessionCard
              key={index}
              counselor={session.counselor}
              time={session.time}
              students={session.students}
              status={session.status}
            />
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}