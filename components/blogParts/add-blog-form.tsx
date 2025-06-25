"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, LinkIcon, Plus, Maximize2, Minimize2, Save, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ImageUpload {
  file: File | null
  url: string
  preview: string
}

export default function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    type: "",
    short_description: "",
    description1: "",
    description2: "",
    description3: "",
  })

  const [images, setImages] = useState<ImageUpload[]>([
    { file: null, url: "", preview: "" },
    { file: null, url: "", preview: "" },
    { file: null, url: "", preview: "" },
  ])

  const [expandedTextareas, setExpandedTextareas] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (index: number, file: File) => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    try {
      const { data, error } = await supabase.storage.from("images").upload(fileName, file)

      if (error) {
        console.error("Error uploading image:", error)
        return
      }

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName)

      setImages((prev) => {
        const newImages = [...prev]
        newImages[index] = {
          file,
          url: urlData.publicUrl,
          preview: URL.createObjectURL(file),
        }
        return newImages
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleImageUrl = (index: number, url: string) => {
    setImages((prev) => {
      const newImages = [...prev]
      newImages[index] = {
        file: null,
        url,
        preview: url,
      }
      return newImages
    })
  }

  const toggleTextareaSize = (field: string) => {
    setExpandedTextareas((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(field)) {
        newSet.delete(field)
      } else {
        newSet.add(field)
      }
      return newSet
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const blogData = {
        ...formData,
        image1: images[0].url || null,
        image2: images[1].url || null,
        image3: images[2].url || null,
      }

      const { error } = await supabase.from("blogs").insert([blogData])

      if (error) {
        console.error("Error creating blog:", error)
        return
      }

      router.push("/blog-management")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const markdownHelp = `
**Markdown Guide:**
# Heading 1
## Heading 2  
### Heading 3
**Bold text**
*Italic text*
> Blockquote
- List item
1. Numbered list
[Link text](URL)
\`inline code\`
\`\`\`
code block
\`\`\`
---
Horizontal line
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Blog</h1>
          <p className="text-gray-600">Create and publish a new blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <Label>Image {index + 1}</Label>

                  {/* Image Preview */}
                  <div className="relative h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    {image.preview ? (
                      <Image
                        src={image.preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Plus className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Add Image</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Options */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const input = document.createElement("input")
                          input.type = "file"
                          input.accept = "image/*"
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) handleImageUpload(index, file)
                          }
                          input.click()
                        }}
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const url = prompt("Enter image URL:")
                          if (url) handleImageUrl(index, url)
                        }}
                      >
                        <LinkIcon className="w-4 h-4 mr-1" />
                        URL
                      </Button>
                    </div>
                    {image.url && (
                      <Input
                        value={image.url}
                        onChange={(e) => handleImageUrl(index, e.target.value)}
                        placeholder="Image URL"
                        className="text-xs"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="url">URL Slug</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  placeholder="blog-url-slug"
                />
              </div>
              <div>
                <Label htmlFor="type">Category</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange("short_description", e.target.value)}
                placeholder="Brief description for blog preview"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        {[1, 2, 3].map((section) => (
          <Card key={section}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Content Section {section}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleTextareaSize(`description${section}`)}
              >
                {expandedTextareas.has(`description${section}`) ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Label htmlFor={`description${section}`}>Content (Markdown Supported)</Label>
                  <Textarea
                    id={`description${section}`}
                    value={formData[`description${section}` as keyof typeof formData]}
                    onChange={(e) => handleInputChange(`description${section}`, e.target.value)}
                    placeholder="Write your content here using Markdown..."
                    rows={expandedTextareas.has(`description${section}`) ? 15 : 8}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="lg:col-span-1">
                  <Label>Markdown Guide</Label>
                  <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono whitespace-pre-line max-h-64 overflow-y-auto">
                    {markdownHelp}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {loading ? "Creating..." : "Create Blog"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
