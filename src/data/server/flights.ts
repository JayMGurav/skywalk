import { SearchInterface } from "@/types/booking.type";
import { format } from "date-fns";
import { createClient } from "@/utils/supabase/server";

import "server-only";

export async function getFlightDetails({ token }: { token: string }) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_RAPID_API_URL}/api/v1/flights/getFlightDetails`,
  );

  const params = url.searchParams;
  params.append("token", token);
  params.append("currency_code", "INR");

  const flightResponse = await fetch(url.toString(), {
    headers: {
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    },
  }).then((res) => res.json());
  
  if (flightResponse) {
    return { success: true, data: flightResponse.data };
  } else {
    return { success: false, error: "error fetching flight details" };
  }
}


export async function getFlights({
  fromId,
  fromCityName,
  toCityName,
  toId,
  departDate,
  adults,
  cabinClass,
  returnDate
}:SearchInterface){
  const supabase = await createClient();

    const url = new URL(
      `${process.env.NEXT_PUBLIC_RAPID_API_URL}/api/v1/flights/searchFlights`,
    );
    const params = url.searchParams;
    if (fromId) {
      params.append("fromId", fromId);
    }
    if (toId) {
      params.append("toId", toId);
    }
  
    if (departDate) {
      params.append(
        "departDate",
        format(departDate, "yyyy-MM-dd"),
      );
    }
    if (returnDate) {
      params.append(
        "returnDate",
        format(returnDate, "yyyy-MM-dd"),
      );
    }
  
    if (adults) {
      params.append("adults", String(adults));
    }
    if (cabinClass) {
      params.append("cabinClass", cabinClass);
    }
  
    params.append("currency_code", "INR");
    params.append("sort", "BEST");
    params.append("pageNo", "1");

    try{
    const searchFlightsResponse = await fetch(url.toString(), {
      headers: {
        "x-rapidapi-host": "booking-com15.p.rapidapi.com",
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      },
    }).then((res) => res.json());

    // TODO: gives 404 to check later
    // await supabase.rpc("save_recent_search", {
    //   from_id: fromId,
    //   to_id: toId,
    //   from_city_name: fromCityName,
    //   to_city_name: toCityName,
    //   departure_date: departDate,
    //   arrival_date: returnDate || "",
    //   cabin_class: cabinClass,
    //   adults
    // });


    if (searchFlightsResponse && searchFlightsResponse?.data)  {
      return { success: true, data: searchFlightsResponse.data.flightOffers };
    } else {
      return { success: false, error: searchFlightsResponse?.message || "error searching flights" };
    }
  } catch(err){
    throw new Error("Error fetching flights", {cause:err})
  }
}