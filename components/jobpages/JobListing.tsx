'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Mail, Phone, DownloadCloud } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

type JobApplication = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  position: string | null
  experience: number | null
  resume_url: string | null
  additional_info: string | null
  expertise: string | null
  created_at: string
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('job_application')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error('Error fetching job applications:', error)
      else setApplications(data || [])
    }

    fetchData()
  }, [])

  const filteredData = applications.filter((entry) =>
    `${entry.first_name} ${entry.last_name} ${entry.email} ${entry.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Applications</h1>
        <p className="text-gray-500 mb-4">View and manage job applications submitted by candidates.</p>
        <div className="relative max-w-md">
          <Input
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredData.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleExpand(entry.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') toggleExpand(entry.id)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="/profile-icon.png"
                        alt="Profile Icon"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {entry.first_name} {entry.last_name}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> {entry.email} | <Phone className="w-4 h-4" /> {entry.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      {expanded === entry.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === entry.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden mt-4 border-t pt-4 space-y-3 text-sm text-gray-700"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><strong>Position:</strong> {entry.position || '-'}</div>
                          <div><strong>Experience:</strong> {entry.experience || 0} years</div>
                          <div><strong>Expertise:</strong> {entry.expertise || '-'}</div>
                        </div>

                        {entry.additional_info && (
                          <div>
                            <strong>Additional Info:</strong>
                            <p className="mt-1 text-gray-600 italic">{entry.additional_info}</p>
                          </div>
                        )}

                        {entry.resume_url && (
                          <motion.a
                            href={entry.resume_url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-3 inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                          >
                            <DownloadCloud className="w-5 h-5" />
                            Download Resume
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
