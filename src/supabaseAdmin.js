import { createClient } from "@supabase/supabase-js";

// La service role key bypass le RLS — à utiliser uniquement côté admin.
// Ajoute VITE_SUPABASE_SERVICE_KEY dans ton fichier .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});
