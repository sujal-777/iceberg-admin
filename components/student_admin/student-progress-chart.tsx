"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weekData = [
  { name: "Mon", enrolled: 120, active: 85 },
  { name: "Tue", enrolled: 180, active: 100 },
  { name: "Wed", enrolled: 210, active: 130 },
  { name: "Thu", enrolled: 250, active: 120 },
  { name: "Fri", enrolled: 320, active: 220 },
  { name: "Sat", enrolled: 310, active: 210 },
  { name: "Sun", enrolled: 300, active: 200 },
];

const monthData = [
  { name: "Week 1", enrolled: 780, active: 550 },
  { name: "Week 2", enrolled: 890, active: 620 },
  { name: "Week 3", enrolled: 950, active: 680 },
  { name: "Week 4", enrolled: 1100, active: 780 },
];

export default function StudentProgressChart() {
  const [activeTab, setActiveTab] = useState("week");
  const data = activeTab === "week" ? weekData : monthData;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Student Progress
        </CardTitle>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[220px]"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0 pl-2 pt-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#41d7a7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#41d7a7" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4fadff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4fadff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={8}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.1}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="enrolled"
                stroke="#41d7a7"
                fillOpacity={1}
                fill="url(#colorEnrolled)"
                strokeWidth={2}
                name="Enrolled"
              />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#4fadff"
                fillOpacity={1}
                fill="url(#colorActive)"
                strokeWidth={2}
                name="Active"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
