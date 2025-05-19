// import type React from "react"
// import { FileText, UserPlus, Calendar, ClipboardList } from "lucide-react"
// import Link from "next/link"

// interface QuickAccessToolProps {
//   title: string
//   icon: React.ReactNode
//   href: string
// }

// const QuickAccessTool = ({ title, icon, href }: QuickAccessToolProps) => {
//   return (
//     <Link
//       href={href}
//       className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg transition-transform hover:scale-105"
//     >
//       <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-200 rounded-full">{icon}</div>
//       <h3 className="text-lg font-medium text-center">{title}</h3>
//     </Link>
//   )
// }

// export default function QuickAccessTools() {
//   const tools = [
//     {
//       title: "Create Test",
//       icon: <FileText className="w-8 h-8 text-blue-600" />,
//       href: "/create-test",
//     },
//     {
//       title: "Add Student",
//       icon: <UserPlus className="w-8 h-8 text-blue-600" />,
//       href: "/add-student",
//     },
//     {
//       title: "Schedule Session",
//       icon: <Calendar className="w-8 h-8 text-blue-600" />,
//       href: "/schedule-session",
//     },
//     {
//       title: "Generate Report",
//       icon: <ClipboardList className="w-8 h-8 text-blue-600" />,
//       href: "/generate-report",
//     },
//   ]

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Quick Access Tools</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {tools.map((tool, index) => (
//           <QuickAccessTool key={index} title={tool.title} icon={tool.icon} href={tool.href} />
//         ))}
//       </div>
//     </div>
//   )
// }
