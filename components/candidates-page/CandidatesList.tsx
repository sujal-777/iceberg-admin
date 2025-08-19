"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for students
const studentsData = [
  {
    id: "STU20250512",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    subject: "CA Final",
    batch: "2025",
    enrollmentDate: "May 1, 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250513",
    name: "Rahul Gupta",
    email: "rahul.gupta@example.com",
    subject: "CS Executive",
    batch: "2025",
    enrollmentDate: "April 15, 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250514",
    name: "Neha Patel",
    email: "neha.patel@example.com",
    subject: "CMA Intermediate",
    batch: "2025",
    enrollmentDate: "March 10, 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250515",
    name: "Arjun Kapoor",
    email: "arjun.kapoor@example.com",
    subject: "CA Inter",
    batch: "2025",
    enrollmentDate: "February 5, 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250516",
    name: "Meera Singh",
    email: "meera.singh@example.com",
    subject: "CS Professional",
    batch: "2025",
    enrollmentDate: "January 20, 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250517",
    name: "Vikram Desai",
    email: "vikram.desai@example.com",
    subject: "CMA Final",
    batch: "2024",
    enrollmentDate: "December 15, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "STU20250518",
    name: "Ananya Reddy",
    email: "ananya.reddy@example.com",
    subject: "CA Foundation",
    batch: "2024",
    enrollmentDate: "November 5, 2024",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const courses = [
  "All Courses",
  "CA Final",
  "CS Executive",
  "CMA Intermediate",
  "CA Inter",
  "CS Professional",
  "CMA Final",
  "CA Foundation",
]

const batches = ["All Batches", "2025", "2024", "2023"]

export default function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")
  const [selectedBatch, setSelectedBatch] = useState("All Batches")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const itemsPerPage = 10
  const totalEntries = studentsData.length

  // Filter students based on search and filters
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All Courses" || student.subject === selectedCourse
    const matchesBatch = selectedBatch === "All Batches" || student.batch === selectedBatch
    return matchesSearch && matchesCourse && matchesBatch
  })

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

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

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      backgroundColor: "rgba(59, 130, 246, 0.05)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      className="flex-1 space-y-6 p-6 bg-gray-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="flex items-center justify-between" variants={itemVariants}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage all students records and enrollment details</p>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm"
        variants={itemVariants}
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-40 border-gray-200">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-32 border-gray-200">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden" variants={itemVariants}>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Students</TableHead>
              <TableHead className="font-semibold text-gray-700">Student ID</TableHead>
              <TableHead className="font-semibold text-gray-700">Subject</TableHead>
              <TableHead className="font-semibold text-gray-700">Batch</TableHead>
              <TableHead className="font-semibold text-gray-700">Enrollment Date</TableHead>
              <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="wait">
              {currentStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  onHoverStart={() => setHoveredRow(student.id)}
                  onHoverEnd={() => setHoveredRow(null)}
                  className="border-b border-gray-100 cursor-pointer"
                  style={{
                    transition: "background-color 0.2s ease",
                    backgroundColor: hoveredRow === student.id ? "rgba(59, 130, 246, 0.05)" : "transparent",
                  }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-700">{student.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {student.subject}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">{student.batch}</TableCell>
                  <TableCell className="text-gray-600">{student.enrollmentDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/candidates/students/${student.id}/edit`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-green-100 rounded transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4 text-green-600" />
                        </motion.button>
                      </Link>
                      <Link href={`/candidates/students/${student.id}/view`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-blue-100 rounded transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination Section */}
      <motion.div
        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
        variants={itemVariants}
      >
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} entries
        </p>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </motion.div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.div key={page} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 p-0 ${
                  currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-gray-50"
                }`}
              >
                {page}
              </Button>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
