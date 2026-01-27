import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabase/server";

export async function GET() {
  const sb = supabaseServer();

  // This does not require existing tables; it just checks we can reach Supabase.
  const { data, error } = await sb.from("products").select("id").limit(1);

  // If you don't have that table, you can instead query a table you create (see SQL below).
  return NextResponse.json({
    ok: !error,
    note: error ? "Connected but table missing (expected if empty DB)." : "Connected + query ok.",
    error: error?.message ?? null,
    sampleRows: data ?? null,
  });
}
