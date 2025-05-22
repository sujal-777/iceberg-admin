// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dugvwcbevjwcqdbegsot.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Z3Z3Y2Jldmp3Y3FkYmVnc290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4ODY5MDYsImV4cCI6MjA2MDQ2MjkwNn0.pihqfVNSly5OHje9U0Q61TLhrIh3xnRDmpGPp9NrTzs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
