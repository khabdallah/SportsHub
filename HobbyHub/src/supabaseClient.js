import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://hjcmelklfftruzbyrbia.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqY21lbGtsZmZ0cnV6YnlyYmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTE2MTksImV4cCI6MjA2MTE4NzYxOX0.FrVAD8OGbjm75QWWDTiKjpuZUcUyH_MUFrjmwsF-JGw"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)