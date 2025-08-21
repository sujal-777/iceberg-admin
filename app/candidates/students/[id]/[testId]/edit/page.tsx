"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Download, Printer, Mail, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

// Mock data for student results - simplified for editing summary fields
const studentData = {
  id: "STU20250512",
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  course: "CA Final",
  testSeries: "Advanced Accounting - Mock Test 3",
  attemptDate: "May 14, 2025",
  totalScore: 144,
  maxScore: 200,
  grade: "B+",
  percentage: 72,
  multipleChoice: {
    total: 50,
    accuracy: 76,
    correct: 38,
    incorrect: 12,
  },
  descriptive: {
    totalQuestions: 10,
    avgScore: 7.2,
    attempted: 10,
    notAttempted: 0,
  },
}

export default function StudentResultsEdit() {
  const params = useParams<{ id: string; testId: string }>()
  const [student, setStudent] = useState(studentData)
  const [editedDescriptive, setEditedDescriptive] = useState<{
    totalQuestions: number
    avgScore: number
    attempted: number
    notAttempted: number
  }>({
    totalQuestions: 0,
    avgScore: 0,
    attempted: 0,
    notAttempted: 0,
  })
  const [isEditing, setIsEditing] = useState(false)

//   useEffect(() => {
//     setStudent({ ...studentData, id: params.id })
//     setEditedDescriptive(studentData.descriptive)
//   }, [params.id])


useEffect(() => {
  const fetchStudentData = async () => {
    console.log(params.id, params.testId)
    try {
      const res = await fetch(
        `https://icebreg-backend2.onrender.com/api/apply/student-result/${params.id}/${params.testId}`
      )
      if (!res.ok) throw new Error("Failed to fetch student result")

      const data = await res.json()

      // 🔹 Map API response into your studentData structure
      const mappedStudent = {
        id: data.studentInfo.id,
        name: data.studentInfo.name,
        email: data.studentInfo.email,
        course: data.studentInfo.subject || "N/A",
        testSeries: data.testResult.testName,
        attemptDate: new Date(data.testResult.examDate).toLocaleDateString(),
        totalScore: data.testResult.score,
        maxScore: data.testResult.totalMarks,
        grade: data.testResult.status,
        percentage: Math.round((data.testResult.score / data.testResult.totalMarks) * 100),
        multipleChoice: {
          total: data.testResult.mcqSummary.totalMCQs,
          accuracy: parseFloat(data.testResult.mcqSummary.accuracy),
          correct: data.testResult.mcqSummary.correct,
          incorrect: data.testResult.mcqSummary.incorrect,
        },
        descriptive: {
          totalQuestions: data.testResult.descriptiveSummary.totalQuestions,
          avgScore: parseFloat(data.testResult.descriptiveSummary.avgScore),
          attempted: data.testResult.descriptiveSummary.attempted,
          notAttempted: data.testResult.descriptiveSummary.notAttempted,
        },
      }

      setStudent(mappedStudent)
      setEditedDescriptive({
        totalQuestions: mappedStudent.descriptive.totalQuestions,
        avgScore: mappedStudent.descriptive.avgScore,
        attempted: mappedStudent.descriptive.attempted,
        notAttempted: mappedStudent.descriptive.notAttempted,
      })
    } catch (err) {
      console.error("Error fetching student result:", err)
    }
  }

  fetchStudentData()
}, [])

  const handleDescriptiveChange = (field: keyof typeof editedDescriptive, value: string) => {
  const numValue = Number(value)
  if (!isNaN(numValue) && numValue >= 0) {
    setEditedDescriptive((prev) => ({
      ...prev,
      [field]: field === "avgScore" ? parseFloat(value) : parseInt(value, 10),
    }))
  }
}


//   const handleSaveMarks = async () => {
//     // Calculate new total score and percentage based on edited descriptive data
//     const mcqScore = student.multipleChoice.correct * 2 // Assuming 2 marks per MCQ
//     const descriptiveScore = editedDescriptive.avgScore * editedDescriptive.totalQuestions
//     const newTotalScore = mcqScore + descriptiveScore
//     const newPercentage = Math.round((newTotalScore / student.maxScore) * 100)

//     // Update student data
//     setStudent((prev) => ({
//       ...prev,
//       totalScore: newTotalScore,
//       percentage: newPercentage,
//       descriptive: editedDescriptive,
//     }))

//     setIsEditing(false)
//     toast({
//       title: "Marks updated",
//       description: "Student descriptive marks have been successfully updated.",
//     })
//   }
const handleSaveMarks = async () => {
  if (!student) return

  // Calculate new total score and percentage based on edited descriptive data
  const mcqScore = student.multipleChoice.correct * 2 // Assuming 2 marks per MCQ
  const descriptiveScore = editedDescriptive.avgScore * editedDescriptive.totalQuestions
  const newTotalScore = mcqScore + descriptiveScore
  const newPercentage = Math.round((newTotalScore / student.maxScore) * 100)

  // Update UI instantly
  setStudent((prev) => ({
    ...prev,
    totalScore: newTotalScore,
    percentage: newPercentage,
    descriptive: editedDescriptive,
  }))

  setIsEditing(false)
  toast({
    title: "Marks updated",
    description: "Student descriptive marks have been successfully updated.",
  })

  // 🔹 Prepare payload for API
  const payload = {
    descriptiveTotal: editedDescriptive.totalQuestions,
    descriptiveAttempted: editedDescriptive.attempted,
    descriptiveScore: descriptiveScore,
    answers: [], // Add descriptive answers array if you have them
  }

  try {
    const res = await fetch(
      `https://icebreg-backend2.onrender.com/api/apply/userexam/${params.id}/${params.testId}/descriptive`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )

    if (!res.ok) {
      throw new Error("Failed to update descriptive marks")
    }

    const result = await res.json()
    console.log("Descriptive marks updated successfully:", result)
  } catch (error) {
    console.error("Error updating descriptive marks:", error)
    toast({
      title: "Update failed",
      description: "Could not save descriptive marks to server.",
      variant: "destructive",
    })
  }
}

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
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
                    <p className="font-medium">{student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attempt Date</p>
                    <p className="font-medium">{student.attemptDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl font-bold">{student.percentage}%</p>
                  </div>
                  <Progress
                    value={student.percentage}
                    className="h-32 w-32 rounded-full [&>div]:rounded-full [&>div]:border-8 [&>div]:border-purple-500 bg-gray-100"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">
                    Total Score: {student.totalScore}/{student.maxScore}
                  </p>
                  <p className="text-sm text-gray-600">Grade: {student.grade}</p>
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
                  <p className="text-3xl font-bold">{student.multipleChoice.total}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-3xl font-bold">{student.multipleChoice.accuracy}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Correct</p>
                  <p className="text-3xl font-bold text-green-600">{student.multipleChoice.correct}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-600">Incorrect</p>
                  <p className="text-3xl font-bold text-red-600">{student.multipleChoice.incorrect}</p>
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
                  <p className="text-3xl font-bold">{student.descriptive.totalQuestions}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Avg. Score</p>
                  <p className="text-3xl font-bold">{student.descriptive.avgScore}/10</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Attempted</p>
                  <p className="text-3xl font-bold text-blue-600">{student.descriptive.attempted}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Not Attempted</p>
                  <p className="text-3xl font-bold text-gray-600">{student.descriptive.notAttempted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Descriptive Questions Summary - Editable */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Descriptive Questions</CardTitle>
            {isEditing ? (
              <Button onClick={handleSaveMarks} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Marks
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Marks</Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Questions</p>
                {isEditing ? (
                  <Input
                    type="number"
                    min={0}
                    value={editedDescriptive.totalQuestions}
                    onChange={(e) => handleDescriptiveChange("totalQuestions", e.target.value)}
                    className="text-3xl font-bold h-12 text-center border-2 border-blue-200 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-3xl font-bold">{student.descriptive.totalQuestions}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Score</p>
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={editedDescriptive.avgScore}
                      onChange={(e) => handleDescriptiveChange("avgScore", e.target.value)}
                      className="text-3xl font-bold h-12 text-center border-2 border-blue-200 focus:border-blue-500"
                    />
                    <span className="text-xl font-bold text-gray-500">/10</span>
                  </div>
                ) : (
                  <p className="text-3xl font-bold">{student.descriptive.avgScore}/10</p>
                )}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Attempted</p>
                {isEditing ? (
                  <Input
                    type="number"
                    min={0}
                    value={editedDescriptive.attempted}
                    onChange={(e) => handleDescriptiveChange("attempted", e.target.value)}
                    className="text-3xl font-bold h-12 text-center border-2 border-blue-200 focus:border-blue-500 text-blue-600"
                  />
                ) : (
                  <p className="text-3xl font-bold text-blue-600">{student.descriptive.attempted}</p>
                )}
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Not Attempted</p>
                {isEditing ? (
                  <Input
                    type="number"
                    min={0}
                    value={editedDescriptive.notAttempted}
                    onChange={(e) => handleDescriptiveChange("notAttempted", e.target.value)}
                    className="text-3xl font-bold h-12 text-center border-2 border-blue-200 focus:border-blue-500 text-gray-600"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-600">{student.descriptive.notAttempted}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> The detailed questions and answers are available in the PDF download. Edit the
                  summary metrics above to update the student's descriptive performance.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
