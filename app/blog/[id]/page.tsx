// "use client"

// import { useEffect, useState } from "react"
// import { supabase, type BlogData } from "@/lib/supabaseClient"
// import Image from "next/image"
// import Link from "next/link"
// import ReactMarkdown from "react-markdown"
// import remarkGfm from "remark-gfm"
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaUserCircle } from "react-icons/fa"

// const markdownComponents = {
//   h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
//   h2: ({ node, ...props }: any) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2" {...props} />,
//   h3: ({ node, ...props }: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
//   a: ({ node, ...props }: any) => (
//     <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
//   ),
//   li: ({ node, ...props }: any) => <li className="ml-6 list-disc" {...props} />,
//   blockquote: ({ node, ...props }: any) => (
//     <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4" {...props} />
//   ),
//   code: ({ node, ...props }: any) => (
//     <code className="bg-gray-100 rounded px-1 py-0.5 text-red-600 font-mono text-sm" {...props} />
//   ),
//   pre: ({ node, ...props }: any) => (
//     <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4" {...props} />
//   ),
//   table: ({ node, ...props }: any) => (
//     <table className="table-auto border-collapse border border-gray-300 my-4 w-full" {...props} />
//   ),
//   th: ({ node, ...props }: any) => <th className="border border-gray-300 bg-gray-100 p-2 text-left" {...props} />,
//   td: ({ node, ...props }: any) => <td className="border border-gray-300 p-2" {...props} />,
// }

// export default function BlogDetail({ params }: { params: { id: string } }) {
//   const [blog, setBlog] = useState<BlogData | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const { data, error } = await supabase.from("blogs").select("*").eq("id", params.id).single()

//       if (error) console.error("Error fetching blog:", error)
//       setBlog(data)
//       setLoading(false)
//     }

//     fetchBlog()
//   }, [params.id])

//   if (loading) return <div className="text-center">Loading...</div>
//   if (!blog) return <div className="text-center text-red-500">Blog not found.</div>

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-16">
//       {/* Blog Title */}
//       <h1 className="text-4xl font-bold text-center mb-4">{blog.title}</h1>

//       {/* Author Section */}
//       <div className="flex items-center justify-center gap-3 mb-6">
//         <FaUserCircle className="text-yellow-500 text-3xl" />
//         <p className="text-gray-600 font-medium text-lg">By {blog.author || "Unknown"}</p>
//       </div>

//       {/* Divider */}
//       <hr className="border-gray-300 mb-6" />

//       {/* Blog Image 1 and Description 1 */}
//       {blog.image1 && (
//         <div className="w-full flex justify-center mt-6">
//           <Image
//             src={blog.image1 || "/placeholder.svg"}
//             width={700}
//             height={400}
//             alt="Blog Image 1"
//             className="rounded-lg object-cover"
//           />
//         </div>
//       )}

//       {blog.description1 && (
//         <div className="prose lg:prose-lg max-w-none mt-4">
//           <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
//             {blog.description1}
//           </ReactMarkdown>
//         </div>
//       )}

//       {/* Blog Image 2 and Description 2 */}
//       {blog.image2 && (
//         <div className="w-full flex justify-center mt-6">
//           <Image
//             src={blog.image2 || "/placeholder.svg"}
//             width={600}
//             height={300}
//             alt="Blog Image 2"
//             className="rounded-lg object-cover"
//           />
//         </div>
//       )}

//       {blog.description2 && (
//         <div className="prose lg:prose-lg max-w-none mt-4">
//           <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
//             {blog.description2}
//           </ReactMarkdown>
//         </div>
//       )}

//       {/* Blog Image 3 and Description 3 */}
//       {blog.image3 && (
//         <div className="w-full flex justify-center mt-6">
//           <Image
//             src={blog.image3 || "/placeholder.svg"}
//             width={600}
//             height={300}
//             alt="Blog Image 3"
//             className="rounded-lg object-cover"
//           />
//         </div>
//       )}

//       {blog.description3 && (
//         <div className="prose lg:prose-lg max-w-none mt-4">
//           <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
//             {blog.description3}
//           </ReactMarkdown>
//         </div>
//       )}

//       {/* Social Media Links */}
//       <div className="flex justify-end items-center gap-4 mt-10 text-gray-600">
//         <Link href="#" className="hover:text-blue-600">
//           <FaFacebook size={28} />
//         </Link>
//         <Link href="#" className="hover:text-blue-400">
//           <FaTwitter size={28} />
//         </Link>
//         <Link href="#" className="hover:text-pink-500">
//           <FaInstagram size={28} />
//         </Link>
//         <Link href="#" className="hover:text-red-600">
//           <FaYoutube size={28} />
//         </Link>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { supabase, type BlogData } from "@/lib/supabaseClient"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaUserCircle } from "react-icons/fa"

const markdownComponents = {
  h1: ({ node, ...props }: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  a: ({ node, ...props }: any) => (
    <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="ml-6 list-disc" {...props} />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: ({ node, ...props }: any) => (
    <code className="bg-gray-100 rounded px-1 py-0.5 text-red-600 font-mono text-sm" {...props} />
  ),
  pre: ({ node, ...props }: any) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  table: ({ node, ...props }: any) => (
    <table className="table-auto border-collapse border border-gray-300 my-4 w-full" {...props} />
  ),
  th: ({ node, ...props }: any) => <th className="border border-gray-300 bg-gray-100 p-2 text-left" {...props} />,
  td: ({ node, ...props }: any) => <td className="border border-gray-300 p-2" {...props} />,
}

// ✅ Fix: params is now a Promise<{ id: string }>
export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { id } = await params // ✅ unwrap params

        const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single()

        if (error) console.error("Error fetching blog:", error)
        setBlog(data)
      } catch (err) {
        console.error("Unexpected error fetching blog:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params])

  if (loading) return <div className="text-center">Loading...</div>
  if (!blog) return <div className="text-center text-red-500">Blog not found.</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center mb-4">{blog.title}</h1>

      {/* Author Section */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaUserCircle className="text-yellow-500 text-3xl" />
        <p className="text-gray-600 font-medium text-lg">By {blog.author || "Unknown"}</p>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-6" />

      {/* Blog Image 1 and Description 1 */}
      {blog.image1 && (
        <div className="w-full flex justify-center mt-6">
          <Image
            src={blog.image1 || "/placeholder.svg"}
            width={700}
            height={400}
            alt="Blog Image 1"
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {blog.description1 && (
        <div className="prose lg:prose-lg max-w-none mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.description1}
          </ReactMarkdown>
        </div>
      )}

      {/* Blog Image 2 and Description 2 */}
      {blog.image2 && (
        <div className="w-full flex justify-center mt-6">
          <Image
            src={blog.image2 || "/placeholder.svg"}
            width={600}
            height={300}
            alt="Blog Image 2"
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {blog.description2 && (
        <div className="prose lg:prose-lg max-w-none mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.description2}
          </ReactMarkdown>
        </div>
      )}

      {/* Blog Image 3 and Description 3 */}
      {blog.image3 && (
        <div className="w-full flex justify-center mt-6">
          <Image
            src={blog.image3 || "/placeholder.svg"}
            width={600}
            height={300}
            alt="Blog Image 3"
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {blog.description3 && (
        <div className="prose lg:prose-lg max-w-none mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.description3}
          </ReactMarkdown>
        </div>
      )}

      {/* Social Media Links */}
      <div className="flex justify-end items-center gap-4 mt-10 text-gray-600">
        <Link href="#" className="hover:text-blue-600">
          <FaFacebook size={28} />
        </Link>
        <Link href="#" className="hover:text-blue-400">
          <FaTwitter size={28} />
        </Link>
        <Link href="#" className="hover:text-pink-500">
          <FaInstagram size={28} />
        </Link>
        <Link href="#" className="hover:text-red-600">
          <FaYoutube size={28} />
        </Link>
      </div>
    </div>
  )
}
