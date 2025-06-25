import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dugvwcbevjwcqdbegsot.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Z3Z3Y2Jldmp3Y3FkYmVnc290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4ODY5MDYsImV4cCI6MjA2MDQ2MjkwNn0.pihqfVNSly5OHje9U0Q61TLhrIh3xnRDmpGPp9NrTzs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ContactData {
  id: number // bigint in Supabase becomes number in TypeScript
  created_at: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: number | null // numeric in Supabase becomes number in TypeScript
  additional: string | null
}



export interface BlogData {
  id: number
  created_at: string
  title: string | null
  author: string | null
  url: string | null
  type: string | null
  short_description: string | null
  image1: string | null
  image2: string | null
  image3: string | null
  description1: string | null
  description2: string | null
  description3: string | null
}

