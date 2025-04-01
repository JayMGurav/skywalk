"use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/redirect";


const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}


export async function signup(formData: FormData) {

  const supabase = await createClient();
  
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const first_name = formData.get("first_name")?.toString();
  const last_name = formData.get("last_name")?.toString();
  const gender = formData.get("gender")?.toString();

  if (!email || !password || !first_name || !last_name || !gender) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, password, firstname, lastname and gender are required",
    );
  }

  const data = {
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        gender
      },
      emailRedirectTo: getURL()
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/signup",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}
