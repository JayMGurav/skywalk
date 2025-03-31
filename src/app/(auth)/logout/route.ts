import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')
  const supabase = await createClient();
  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath(path || "/", "layout")
  revalidatePath('/', 'layout')

  return NextResponse.redirect(new URL("/login", req.url), {
    status: 302,
  });
}
