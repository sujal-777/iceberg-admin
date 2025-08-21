"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Edit, Trash2, FileText, TrendingUp, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useRouter } from "next/navigation"


const statsData = [
  {
    title: "Total Test Series",
    value: "42",
    subtitle: "Across all tests",
    trend: "+12% from last month",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "Active Tests",
    value: "28",
    subtitle: "Currently available",
    trend: "+8% from last month",
    icon: Clock,
    color: "bg-green-500",
  },
  {
    title: "Total Attempts",
    value: "1,253",
    subtitle: "Last 30 days",
    trend: "+15% from last month",
    icon: Users,
    color: "bg-purple-500",
  },
]

const chartData = {
  completion: [
    { week: "Week 1", started: 85, completed: 78 },
    { week: "Week 2", started: 88, completed: 75 },
    { week: "Week 3", started: 92, completed: 85 },
    { week: "Week 4", started: 87, completed: 82 },
    { week: "Week 5", started: 95, completed: 88 },
    { week: "Week 6", started: 90, completed: 85 },
  ],
  scores: [
    { subject: "CA", score: 75 },
    { subject: "CS", score: 82 },
    { subject: "CMA", score: 78 },
  ],
}

type TestSeriesItem = {
  _id: string;
  name: string;
  examId: { name: string } | string;
  numberOfQuestions: number;
  duration: number | string;
  createdDate: string;
};

export default function TestSeriesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [testSeriesData,setTestSeriesData]=useState<TestSeriesItem[]>([]);
  const [testSeriesExamData,setTestSeriesExamData]=useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('https://icebreg-backend2.onrender.com/api/test-series');
      const data = await res.json();
      console.log('Fetched test series Data:', data);
      setTestSeriesData(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchExamData = async () => {
    try {
      const res = await fetch('https://icebreg-backend2.onrender.com/admin/exams');
      const data = await res.json();
      console.log('Fetched exam Data:', data);
      setTestSeriesExamData(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchExamData();
}, []);

  const deleteTestSeriesItem = async (id: string) => {
  try {
    const res = await fetch(`https://icebreg-backend2.onrender.com/api/test-series/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete');
    }

    const data = await res.json();
    alert('Test series deleted successfully')
    console.log('Deleted:', data);
    setTestSeriesData(prevData => prevData.filter((item) => item._id !== id));

  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

  
  const itemsPerPage = 7
const router=useRouter();
  const filteredData = testSeriesData.filter((item) => {
    if (!item || !item.name || !item.examId) return false;

    const examName = typeof item.examId === "string" ? item.examId : item.examId.name;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      courseFilter === "all" || examName.toLowerCase().includes(courseFilter.toLowerCase());

    const matchesLevel =
      levelFilter === "all" || examName.toLowerCase().includes(levelFilter.toLowerCase());

    return matchesSearch && matchesCourse && matchesLevel;
  });
console.log("filteredData",filteredData[0])
    // console.log("filteredData"+matchesSearch + matchesCourse + matchesLevel)


  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }
  const handleEditTestSeries=(id:string)=>{
    const itemToEdit=testSeriesData.find(item => item._id === id);
    localStorage.setItem('itemToEdit',JSON.stringify(itemToEdit));
    router.push('/test-series/Update_test_series')
  }
const openTestSeriespage=(id: string)=>{
  const selectedTestSeries = testSeriesData.find(item => item._id === id);
if (selectedTestSeries) {
    localStorage.setItem('testseriesData', JSON.stringify(selectedTestSeries));
    router.push('/test-series/Single_test_series_details');
  } else {
    console.error("Test series not found for ID:", id);
  }
}

  return (
    <motion.div
      className="p-6 space-y-6 bg-gray-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="flex justify-between items-start" variants={itemVariants}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test Series</h1>
          <p className="text-gray-600 mt-1">Manage all test series and question bank for CA, CS, and CMA exams</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a href='/test-series/Create_new_testSeries'>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Test Series
          </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
        {statsData.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.trend}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div className="bg-white rounded-lg shadow-sm border-0 p-6" variants={itemVariants}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="ca">CA</SelectItem>
                <SelectItem value="cs">CS</SelectItem>
                <SelectItem value="cma">CMA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="foundation">Foundation</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">Subjects</TableHead>
                <TableHead className="font-semibold text-gray-900">Exam</TableHead>
                <TableHead className="font-semibold text-gray-900">Questions</TableHead>
                <TableHead className="font-semibold text-gray-900">Duration</TableHead>
                <TableHead className="font-semibold text-gray-900">Created Date</TableHead>
                <TableHead className="font-semibold text-gray-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {paginatedData.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{typeof item.examId === "string" ? item.examId : item.examId.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.numberOfQuestions}</div>
                      </div>
                    </TableCell>
                    {/* {testSeriesExamData.map((ex,idx)=>(
                      item.examId==ex._id &&
                      <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {ex.title}
                      </Badge>
                    </TableCell>
                    ) )} */}
                    
                    {/* <TableCell className="font-medium"></TableCell> */}
                    <TableCell>{item.duration}</TableCell>
                   <TableCell>
  {new Date(item.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-green-100 rounded transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-green-600" onClick={()=>openTestSeriespage(item._id)}/>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-blue-100 rounded transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4 text-blue-600" onClick={()=>handleEditTestSeries(item._id)} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" onClick={()=>deleteTestSeriesItem(item._id)}/>
                        </motion.button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-blue-600 text-white" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Performance Analytics */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Completion Rate Chart */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Test Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={180 - y * 1.4}
                      x2="380"
                      y2={180 - y * 1.4}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <text key={y} x="30" y={185 - y * 1.4} fontSize="12" fill="#6b7280" textAnchor="end">
                      {y}%
                    </text>
                  ))}

                  {/* Started line */}
                  <motion.polyline
                    points={chartData.completion
                      .map((point, index) => `${60 + index * 50},${180 - point.started * 1.4}`)
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />

                  {/* Completed line */}
                  <motion.polyline
                    points={chartData.completion
                      .map((point, index) => `${60 + index * 50},${180 - point.completed * 1.4}`)
                      .join(" ")}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />

                  {/* Data points */}
                  {chartData.completion.map((point, index) => (
                    <g key={index}>
                      <motion.circle
                        cx={60 + index * 50}
                        cy={180 - point.started * 1.4}
                        r="4"
                        fill="#3b82f6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                      <motion.circle
                        cx={60 + index * 50}
                        cy={180 - point.completed * 1.4}
                        r="4"
                        fill="#10b981"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      />
                    </g>
                  ))}

                  {/* X-axis labels */}
                  {chartData.completion.map((point, index) => (
                    <text key={index} x={60 + index * 50} y="195" fontSize="12" fill="#6b7280" textAnchor="middle">
                      {point.week}
                    </text>
                  ))}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-0 left-0 flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Started</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average Score by Subject Chart */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Average Score by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  {/* Grid lines */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={180 - y * 1.4}
                      x2="280"
                      y2={180 - y * 1.4}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 20, 40, 60, 80, 100].map((y) => (
                    <text key={y} x="30" y={185 - y * 1.4} fontSize="12" fill="#6b7280" textAnchor="end">
                      {y}
                    </text>
                  ))}

                  {/* Bars */}
                  {chartData.scores.map((item, index) => (
                    <g key={item.subject}>
                      <motion.rect
                        x={70 + index * 60}
                        y={180 - item.score * 1.4}
                        width="40"
                        height={item.score * 1.4}
                        fill="#06b6d4"
                        initial={{ height: 0, y: 180 }}
                        animate={{ height: item.score * 1.4, y: 180 - item.score * 1.4 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                      <text x={90 + index * 60} y="195" fontSize="12" fill="#6b7280" textAnchor="middle">
                        {item.subject}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
