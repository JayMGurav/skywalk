import { User } from "@supabase/supabase-js";
import { Tables } from "./database.types";

export type LoggedInUser = User & Tables<"user_profiles">

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
