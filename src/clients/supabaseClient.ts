import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

export const supabaseClient = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
