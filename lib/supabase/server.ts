// D'Elegance - Supabase Server Client
// TODO: Replace mock data with Supabase queries when credentials are configured

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for use in server components and API routes
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 * - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key (for admin operations)
 */
export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase credentials not configured. Using mock data. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to connect to Supabase.'
    )
    return null
  }

  // TODO: Uncomment and implement when connecting to Supabase
  /*
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
  */
  return null
}

/**
 * Creates a Supabase admin client with service role key
 * Use this for admin operations that bypass Row Level Security
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn(
      'Supabase admin credentials not configured. ' +
      'Set SUPABASE_SERVICE_ROLE_KEY for admin operations.'
    )
    return null
  }

  // TODO: Uncomment when connecting to Supabase
  // return createClient(supabaseUrl, supabaseServiceKey, {
  //   auth: {
  //     autoRefreshToken: false,
  //     persistSession: false,
  //   },
  // })
  return null
}
