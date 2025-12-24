import { createClient } from '@supabase/supabase-js';

// Assure-toi de mettre ces variables dans un fichier .env à la racine de src
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);