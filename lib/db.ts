import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This client is safe for both client and server
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Only create the admin client on the server
export const supabaseAdmin = typeof window === "undefined"
  ? createClient<Database>(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null;

// Helper function to handle database errors
export function handleDatabaseError(error: any) {
  console.error('Database error:', error)
  
  if (error.code === '23505') {
    return { error: 'Duplicate entry found' }
  }
  
  if (error.code === '23503') {
    return { error: 'Referenced record not found' }
  }
  
  if (error.code === '42P01') {
    return { error: 'Table not found' }
  }
  
  return { error: 'Database operation failed' }
}

// Helper function to validate database connection
export async function validateDatabaseConnection() {
  try {
    const { data, error } = await supabase.from('organizations').select('count').limit(1)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Database connection failed:', error)
    return { success: false, error }
  }
} 