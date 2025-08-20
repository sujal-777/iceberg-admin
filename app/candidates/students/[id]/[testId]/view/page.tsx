"use client"

import { useState, useEffect, use } from "react" // 👈 notice `use`
import { motion } from "framer-motion"
import { Download, Printer, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

type PageProps = {
  params: Promise<{ id: string; testId: string }>;
};

interface StudentData {
  id: string;
  name: string;
  email: string;
  course: string;
  attemptDate: string;
  totalScore: number;
  maxScore: number;
  grade: string;
  percentage: number;
  multipleChoice: {
    total: number;
    accuracy: number;
    correct: number;
    incorrect: number;
  };
  descriptive: {
    totalQuestions: number;
    avgScore: number;
    attempted: number;
    notAttempted: number;
  };
}

export default function StudentResultsView({ params }: PageProps) {
  // ✅ unwrap params with `use()`
  const { id, testId } = use(params);

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://icebreg-backend2.onrender.com/api/apply/student-result/${id}/${testId}`
        );
        setStudent(res.data);
        console.log(res.data)
        setError(null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id && testId) fetchStudentData();
  }, [id, testId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!student) return <p>No student data found</p>;

  // ✨ animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Examination Results</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Printer className="w-4 h-4" />
            <span>Print Result</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Mail className="w-4 h-4" />
            <span>Email Result</span>
          </Button>
        </div>
      </motion.div>

      {/* Student Information */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Student Name</p>
                    <p className="font-medium">{student.studentInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student.studentInfo.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{student.testResult.testName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attempt Date</p>
                    <p className="font-medium">{student.attemptDate ? student.attemptDate : "N/A"}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl font-bold">{student.testResult.mcqSummary.accuracy}</p>
                  </div>
                  <Progress
                    value={student.percentage}
                    className="h-32 w-32 rounded-full [&>div]:rounded-full [&>div]:border-8 [&>div]:border-purple-500 bg-gray-100"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">
                    Total Score: {student.testResult.totalMarks}/{student.testResult.score}
                  </p>
                  {/* <p className="text-sm text-gray-600">Grade: {student.grade}</p> */}
                  <p className="text-sm text-gray-600">
                    Grade: {(() => {
                      const { score, totalMarks } = student.testResult;
                      const percentage = (score / totalMarks) * 100;

                      if (percentage >= 90) return "A+";
                      if (percentage >= 80) return "A";
                      if (percentage >= 70) return "B";
                      if (percentage >= 60) return "C";
                      if (percentage >= 50) return "D";
                      return "F";
                    })()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>


{/* Result Summary */}
       <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Result Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Multiple Choice Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Multiple Choice Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total MCQs</p>
                  <p className="text-3xl font-bold">{student.testResult.mcqSummary.totalMCQs}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-3xl font-bold">{student.testResult.mcqSummary.accuracy}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Correct</p>
                  <p className="text-3xl font-bold text-green-600">{student.testResult.mcqSummary.correct}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600">Incorrect</p>
                  <p className="text-3xl font-bold text-red-600">{student.testResult.mcqSummary.incorrect}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descriptive Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Descriptive Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p className="text-3xl font-bold">{student.testResult.descriptiveSummary.totalQuestions}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Avg. Score</p>
                  <p className="text-3xl font-bold">{student.testResult.descriptiveSummary.avgScore}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Attempted</p>
                  <p className="text-3xl font-bold text-blue-600">{student.testResult.descriptiveSummary.attempted}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Not Attempted</p>
                  <p className="text-3xl font-bold text-gray-600">{student.testResult.descriptiveSummary.notAttempted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Descriptive Questions Summary - View Only */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Descriptive Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Questions</p>
                <p className="text-3xl font-bold">{student.testResult.descriptiveSummary.totalQuestions}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Score</p>
                <p className="text-3xl font-bold">{student.testResult.descriptiveSummary.avgScore}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Attempted</p>
                <p className="text-3xl font-bold text-blue-600">{student.testResult.descriptiveSummary.attempted}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Not Attempted</p>
                <p className="text-3xl font-bold text-gray-600">{student.testResult.descriptiveSummary.notAttempted}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Detailed questions and answers are available in the PDF download.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
