"use server";

import { getCurrentUser } from "@/data/server/user";
import { createClient } from "@/utils/supabase/server";

export async function updateProfileAction({
  phone,
  // email,
}: {
  phone: string;
  // email: string;
}) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { error } = await supabase
    .from("user_profiles")
    .update({ phone })
    .eq("id", user?.id);

  if (error) {
    console.log({ error });
    throw new Error("Something went wrong updating user profile");
  }
  return;
}
