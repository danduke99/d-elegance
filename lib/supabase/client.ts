// D'Elegance - Supabase Client (Browser)
// TODO: Replace mock data with Supabase queries when credentials are configured

// import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in browser/client components
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase credentials not configured. Using mock data. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect to Supabase.'
    )
    return null
  }

  // TODO: Uncomment when connecting to Supabase
  // return createBrowserClient(supabaseUrl, supabaseAnonKey)
  return null
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
