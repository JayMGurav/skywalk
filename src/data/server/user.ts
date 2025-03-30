import { SearchInterface } from "@/types/booking.type";
import { Tables } from "@/types/database.types";
import { LoggedInUser } from "@/types/user.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";


export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user }, error
  } = await supabase.auth.getUser();

  if (!user || error) {
    return null;
  } 

  return user
  
}

export async function getCurrentUserProfile(): Promise<LoggedInUser>{
  const supabase = await createClient();
  
  const {
    data: { user }, error
  } = await supabase.auth.getUser();

  if(!user){
    throw Error("User not logged in");
  }

  const {
    data
  } = await supabase.from("user_profiles").select("*").eq("id", user?.id).single()


  if(!data){
    throw Error("User profile does not exist");
  }

  return {
    ...user,
    ...data
  }
}

export async function getCurrentUserRecentSearches(): Promise<{ recent_searches: SearchInterface[] }[]> {
  const supabase = await createClient();
  
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if(!user){
    throw Error("User not logged in");
  }

  const {
    data, error
  } = await supabase.from("user_profiles").select("recent_searches").eq("id", user?.id);

  if(error){
    throw new Error("Error fetching users recent searches", {cause: error});
  }

  return data;
}


export async function getMyFlightBookings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  } else {
    // const { data, error } = await supabase
    //   .from("booking")
    //   .select(
    //     ` *,
    //       booking_traveller (*),
    //       booking_segment (
    //         *,
    //         departure_airport ( id, code, name, city_name, country_name)
    //         arrival_airport ( id, code, name, city_name, country_name)
    //         carrier (id, name, logo, code)
    //       )
    //     `,
    //   )
    //   .eq("user_id", user.id);


      const { data, error } = await supabase
      .from('booking')
      .select(`
        *,
        booking_traveller (*),
        booking_segment (
          *,
          departure_airport:departure_airport_id (*),
          arrival_airport:arrival_airport_id (*),
          carrier:carrier_id (*),
          booking_segment_luggage (*)
        )
      `)
      .eq('user_id', user.id);

    if (error) throw error;

    return data;
  }
}
