import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const urlSupabase = import.meta.env.VITE_SUPABASE_URL as string
const claveAnonima = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!urlSupabase || !claveAnonima) {
  throw new Error('Faltan las variables de entorno de Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)')
}

export const supabase = createClient<Database>(urlSupabase, claveAnonima)
