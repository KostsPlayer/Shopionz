import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL;
const supabaseUrl =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaWp0a2J2bW1wamRieHFxa3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMzkzNDcsImV4cCI6MjAxODYxNTM0N30.iO8nGzYD2kA0saijD8uHCYrTQj-U1Cf3XDaSNx7rzaA";
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
