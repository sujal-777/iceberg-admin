"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { supabase, type ContactData } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const ITEMS_PER_PAGE = 9

export default function ContactManagement() {
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [filteredContacts, setFilteredContacts] = useState<ContactData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // Fetch contacts from Supabase
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("contact") // ← use your actual table name here
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching contacts:", error)
        return
      }

      setContacts(data || [])
      setFilteredContacts(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and search logic
  useEffect(() => {
    let filtered = [...contacts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false ||
          contact.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false ||
          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false ||
          contact.phone?.toString().includes(searchTerm) ||
          false,
      )
    }

    // Apply sort order
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    setFilteredContacts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [contacts, searchTerm, sortOrder])

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string | null, lastName: string | null) => {
    const first = firstName?.charAt(0) || ""
    const last = lastName?.charAt(0) || ""
    return (first + last).toUpperCase() || "??"
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
      className="p-6 bg-white min-h-screen"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Contact Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          Manage all contact form submissions from your website
        </motion.p>
      </div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
            <SelectTrigger className="w-[140px] bg-gray-50 border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700 text-sm">
          <div className="col-span-3">NAME</div>
          <div className="col-span-3">EMAIL</div>
          <div className="col-span-2">PHONE</div>
          <div className="col-span-3">ADDITIONAL</div>
          <div className="col-span-1">DATE</div>
        </div>

        {/* Table Body */}
        <AnimatePresence mode="wait">
          {currentContacts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center text-gray-500"
            >
              No contacts found matching your criteria.
            </motion.div>
          ) : (
            <div>
              {currentContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 p-4 items-center">
                    {/* Name with Avatar */}
                    <div className="col-span-3 flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/profile-icon.png" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">
                          {getInitials(contact.first_name, contact.last_name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 truncate">
                        {`${contact.first_name || ""} ${contact.last_name || ""}`.trim() || "No Name"}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <span className="text-gray-600 truncate block">{contact.email || "No Email"}</span>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2">
                      <span className="text-gray-600">{contact.phone || "No Phone"}</span>
                    </div>

                    {/* Additional with Dropdown */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 truncate flex-1">
                          {contact.additional && contact.additional.length > 30
                            ? `${contact.additional.substring(0, 30)}...`
                            : contact.additional || "No additional info"}
                        </span>
                        {contact.additional && contact.additional.length > 30 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(contact.id.toString())}
                            className="p-1 h-6 w-6"
                          >
                            {expandedRows.has(contact.id.toString()) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-1">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(contact.created_at)}
                      </Badge>
                    </div>
                  </div>

                  {/* Expanded Additional Info */}
                  <AnimatePresence>
                    {expandedRows.has(contact.id.toString()) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="bg-gray-50 rounded-lg p-4 ml-11">
                            <h4 className="font-medium text-gray-900 mb-2">Additional Information:</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {contact.additional || "No additional information provided"}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-between"
        >
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length}{" "}
            contacts
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
