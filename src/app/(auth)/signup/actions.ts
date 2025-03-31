"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";


export async function signup(formData: FormData) {

  const supabase = await createClient();
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        gender: formData.get("gender") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log({error: JSON.stringify(error)});
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
