import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Server-side Supabase admin client (uses service role key)
// Lazy-initialized to avoid build-time errors when env vars aren't set
let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase environment variables are not configured. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file."
    );
  }

  _supabaseAdmin = createClient<Database>(url, serviceKey);
  return _supabaseAdmin;
}
