import { redirect } from "next/navigation"

// Default redirect to view mode
export default function StudentDefaultPage({ params }: { params: { id: string } }) {
  redirect(`/dashboard/students/${params.id}/view`)
}
