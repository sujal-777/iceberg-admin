"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Trash2, Edit, Eye, Filter } from "lucide-react"
import { supabase, type BlogData } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ITEMS_PER_PAGE = 9

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBlogs, setSelectedBlogs] = useState<Set<number>>(new Set())
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching blogs:", error)
        return
      }

      setBlogs(data || [])
      setFilteredBlogs(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and search logic
  useEffect(() => {
    let filtered = [...blogs]

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.Type?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    setFilteredBlogs(filtered)
    setCurrentPage(1)
  }, [blogs, searchTerm, sortOrder])

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex)

  const handleSelectBlog = (blogId: number) => {
    const newSelected = new Set(selectedBlogs)
    if (newSelected.has(blogId)) {
      newSelected.delete(blogId)
    } else {
      newSelected.add(blogId)
    }
    setSelectedBlogs(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedBlogs.size === currentBlogs.length) {
      setSelectedBlogs(new Set())
    } else {
      setSelectedBlogs(new Set(currentBlogs.map((blog) => blog.id)))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedBlogs.size === 0) return

    setDeleting(true)
    try {
      const { error } = await supabase.from("blogs").delete().in("id", Array.from(selectedBlogs))

      if (error) {
        console.error("Error deleting blogs:", error)
        return
      }

      await fetchBlogs()
      setSelectedBlogs(new Set())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Blog Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Create, manage and publish your blog posts
        </motion.p>
      </div>

      {/* Search, Filter and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200 focus:bg-white transition-colors"
            />
          </div>

          <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
            <SelectTrigger className="w-[140px] bg-white border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          {selectedBlogs.size > 0 && (
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              disabled={deleting}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedBlogs.size})
            </Button>
          )}
          <Button
            onClick={() => router.push("/blog-management/add")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add New Blog
          </Button>
        </div>
      </motion.div>

      {/* Select All Checkbox */}
      {currentBlogs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 flex items-center gap-2"
        >
          <Checkbox
            checked={selectedBlogs.size === currentBlogs.length && currentBlogs.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-gray-600">Select All</span>
        </motion.div>
      )}

      {/* Blog Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {currentBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full p-8 text-center text-gray-500"
            >
              No blogs found matching your criteria.
            </motion.div>
          ) : (
            currentBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
                  {/* Checkbox */}
                  <div className="absolute top-3 right-3 z-10">
                    <Checkbox
                      checked={selectedBlogs.has(blog.id)}
                      onCheckedChange={() => handleSelectBlog(blog.id)}
                      className="bg-white border-2 border-gray-300"
                    />
                  </div>

                  {/* Blog Image */}
                  <div className="relative h-48 bg-gray-200">
                    {blog.image1 ? (
                      <Image
                        src={blog.image1 || "/placeholder.svg"}
                        alt={blog.title || "Blog image"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                            <Eye className="w-8 h-8" />
                          </div>
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Blog Type Badge */}
                    {blog.Type && (
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {blog.Type}
                      </Badge>
                    )}

                    {/* Blog Title */}
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
                      {blog.title || "Untitled Blog"}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {blog.short_description || "No description available"}
                    </p>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>By {blog.author || "Unknown"}</span>
                      <span>{formatDate(blog.created_at)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/blog/${blog.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <Link href={`/blog-management/edit/${blog.id}`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className="w-10 h-10 p-0"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
