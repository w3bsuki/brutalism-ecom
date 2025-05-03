import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a mock Supabase client if URL/key are missing
const createMockClient = () => {
  // Return a mock implementation that mimics the Supabase client interface
  // but always returns empty data with no errors
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          limit: async () => ({ data: [], error: null }),
          order: () => ({
            limit: async () => ({ data: [], error: null })
          })
        }),
        limit: async () => ({ data: [], error: null }),
        order: () => ({
          limit: async () => ({ data: [], error: null })
        })
      })
    })
  }
}

// Only create a real client if we have both URL and key
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createMockClient() 