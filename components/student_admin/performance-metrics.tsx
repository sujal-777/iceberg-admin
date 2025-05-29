"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "CA",
    current: 78,
    previous: 65,
  },
  {
    name: "CS",
    current: 85,
    previous: 70,
  },
  {
    name: "CMA",
    current: 62,
    previous: 58,
  },
];

export default function PerformanceMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Performance Metrics</CardTitle>
        <p className="text-sm text-muted-foreground">Exam-wise Performance</p>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="current" fill="#4fadff" name="Current" radius={[4, 4, 0, 0]} />
              <Bar dataKey="previous" fill="#41d7a7" name="Previous" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}