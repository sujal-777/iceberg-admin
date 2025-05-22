"use client";

import { useState } from "react";
import { format } from "date-fns";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  Search,
  Settings,
  Users,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/stat-card";
import { AreaChart } from "@/components/area-chart";
import { BarChartComponent } from "@/components/bar-chart";
import { TestSeriesCard } from "@/components/test-series-card";
import { CounsellingSession } from "@/components/counselling-session";
import QuickAccessTools from "@/components/quick-access-card";

interface DashboardProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function DashboardPage({ user }: DashboardProps) {
  const [currentDate] = useState(new Date());
   const [open, setOpen] = useState(false);


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-[305px] flex-col border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-[36px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BBFF] to-[#0048B0]">
            ICEBERG
          </h2>
        </div>
        <div className="flex-1 py-4">
          <nav className="space-y-4 px-2">
            <Button
              variant="default"
              className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-[16px]"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="outline" className="w-full justify-start text-[16px]">
              <Users className="mr-2 h-4 w-4" />
              Candidate Management
            </Button>
            <Button variant="outline" className="w-full justify-start text-[16px]">
              <BookOpen className="mr-2 h-4 w-4" />
              Test Series
            </Button>
            <Button variant="outline" className="w-full justify-start text-[16px]">
              <Video className="mr-2 h-4 w-4" />
              Concept Video
            </Button>
          </nav>
        </div>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start space-x-2">
            <img src="/supportcenter.png" alt="Support" className="h-5 w-5" />
            <span>Support Center</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {format(currentDate, "dd MMM, yyyy 'at' hh:mm a")}
            </div>
            <Button variant="default" size="default">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="default" size="default">
              <Calendar className="h-5 w-5" />
            </Button>
             <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <Avatar>
          <AvatarImage src={user?.image || "/adminprofile.png"} />
          <AvatarFallback>
            {user?.name?.[0]?.toUpperCase() || "A"}
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <p className="text-sm font-medium">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Students"
              value="2,835"
              change="8.3% from last month"
              trend="up"
              icon="students"
              color="blue"
            />
            <StatCard
              title="Pass Rate"
              value="68.5%"
              change="2.8% from last session"
              trend="up"
              icon="percentage"
              color="blue"
            />
            <StatCard
              title="Average Score"
              value="72.7"
              change="1.5% points increase"
              trend="up"
              icon="chart"
              color="blue"
            />
            <StatCard
              title="Active Test Series"
              value="18"
              change="3 new this week"
              trend="up"
              icon="document"
              color="blue"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Student Progress</CardTitle>
                <Tabs defaultValue="week">
                  <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <AreaChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Performance Metrics</CardTitle>
                <p className="text-sm text-gray-500">Exam-wise Performance</p>
              </CardHeader>
              <CardContent>
                <BarChartComponent />
              </CardContent>
            </Card>
          </div>

          {/* Test Series Overview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Test Series Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TestSeriesCard
                  title="CA Test Series"
                  enrolledStudents="1,256"
                  testSeries="12"
                  progress={72}
                />
                <TestSeriesCard
                  title="CS Test Series"
                  enrolledStudents="876"
                  testSeries="9"
                  progress={81}
                />
                <TestSeriesCard
                  title="CMA Test Series"
                  enrolledStudents="745"
                  testSeries="7"
                  progress={61}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <QuickAccessTools />
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Today's Counselling Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CounsellingSession
                  name="Dr. Anjali Mehta"
                  role="CA Career Guidance Session"
                  time="10:00 AM - 11:30 AM"
                  students="14 Students"
                  status="live"
                />
                <CounsellingSession
                  name="Prof. Rajesh Kumar"
                  role="CS Exam Preparation Strategy"
                  time="02:00 PM - 03:30 PM"
                  students="12 Students"
                  status="scheduled"
                />
                <CounsellingSession
                  name="CA Sunita Agarwal"
                  role="CMA Final Exam Clearing Session"
                  time="04:30 PM - 06:00 PM"
                  students="8 Students"
                  status="scheduled"
                />
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
