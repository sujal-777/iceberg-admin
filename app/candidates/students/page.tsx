import { redirect } from "next/navigation"

// Default list page or redirect logic goes here
export default function StudentDefaultPage() {
  redirect(`/candidates`)
}
