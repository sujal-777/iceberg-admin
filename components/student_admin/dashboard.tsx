"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCards from "@/components/student_admin/stat-cards";
import StudentProgressChart from "@/components/student_admin/student-progress-chart";
import PerformanceMetricsChart from "@/components/student_admin/performance-metrics";
import TestSeriesOverview from "@/components/student_admin/test-serious-overview";
import QuickAccessTools from "@/components/student_admin/quick-access-tool";
import CounselingSessions from "@/components/student_admin/counselling-session";

export default function DashboardPages() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <StatCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StudentProgressChart />
          <PerformanceMetricsChart />
        </div>
        <TestSeriesOverview />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <QuickAccessTools />
          </div>
          <div className="lg:col-span-2">
            <CounselingSessions />
          </div>
        </div>
      </div>
    </div>
  );
}
