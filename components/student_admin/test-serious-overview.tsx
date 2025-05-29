    "use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

interface TestSeriesProps {
  title: string;
  enrolledStudents: number;
  testSeries: number;
  progress: number;
}

function TestSeriesCard({ title, enrolledStudents, testSeries, progress }: TestSeriesProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-blue-100 p-3">
          <BookOpen className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Enrolled Students</p>
              <p className="font-semibold text-gray-900">{enrolledStudents.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Test Series</p>
              <p className="font-semibold text-gray-900">{testSeries}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs text-gray-500">Overall Progress</p>
              <p className="text-xs font-medium text-gray-900">{progress}%</p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Button variant="outline" className="mt-4 w-full text-sm">
            Manage Test Series
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TestSeriesOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Series Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TestSeriesCard
            title="CA Test Series"
            enrolledStudents={1256}
            testSeries={12}
            progress={72}
          />
          <TestSeriesCard
            title="CS Test Series"
            enrolledStudents={876}
            testSeries={9}
            progress={81}
          />
          <TestSeriesCard
            title="CMA Test Series"
            enrolledStudents={745}
            testSeries={7}
            progress={61}
          />
        </div>
      </CardContent>
    </Card>
  );
}