import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://plrdyrggatfklusaadty.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscmR5cmdnYXRma2x1c2FhZHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzExNzMsImV4cCI6MjA5MTIwNzE3M30.r2LrUFRiNOiNw707Awzsfkf5HyALkpSoeztFsDZd1ag";

export const supabase = createClient(supabaseUrl, supabaseKey);

  