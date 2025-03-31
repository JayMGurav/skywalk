import { CabinClassEnum } from "@/types/booking.type";
import { CheckoutInterface } from "@/types/checkout.type";
import { Gender } from "@/types/user.types";
import { priceFormatter } from "@/utils/price-formatter";
import { createClient } from "@/utils/supabase/server";


export async function createBooking(checkoutData: CheckoutInterface) {
  try {
    const supabase = await createClient();

    const {
      data: { user }, error: userError
    } = await supabase.auth.getUser();
    console.log({user, userError})

    if (!user) {
      return { success: false, error: "User Not found." };
    } else {
      const totalPrice = priceFormatter({
        currencyCode: checkoutData?.priceBreakdown?.total?.currencyCode,
        units: checkoutData?.priceBreakdown?.total?.units,
        nanos: checkoutData.priceBreakdown?.total?.nanos,
      });

      const baseFare = priceFormatter({
        currencyCode: checkoutData?.priceBreakdown?.baseFare?.currencyCode,
        units: checkoutData?.priceBreakdown?.baseFare?.units,
        nanos: checkoutData.priceBreakdown?.baseFare?.nanos,
      });

      const tax = priceFormatter({
        currencyCode: checkoutData?.priceBreakdown?.tax?.currencyCode,
        units: checkoutData?.priceBreakdown?.tax?.units,
        nanos: checkoutData.priceBreakdown?.tax?.nanos,
      });

      const { data: bookingData, error: bookingError } = await supabase
        .from("booking")
        .insert({
          user_id: user.id,
          number_of_travellers: checkoutData.numberOfTravellers,
          ticket_type: checkoutData.ticketType,
          token: checkoutData.token,
          total_price: totalPrice,
          base_fare: baseFare,
          tax: tax,
          currency_code: checkoutData.priceBreakdown.total.currencyCode,
          contact_email: checkoutData.contactDetails.email,
          contact_phone: checkoutData.contactDetails.phone,
        })
        .select("id")
        .single();

      if (bookingError) throw bookingError;

      const travellersData = checkoutData.travellers.map((traveller) => ({
        booking_id: bookingData.id,
        first_name: traveller.firstName,
        last_name: traveller.lastName,
        gender: String(traveller.gender).toLowerCase() as Gender,
      }));

      const { error: travellersError } = await supabase
        .from("booking_traveller")
        .insert(travellersData);

      if (travellersError) throw travellersError;

      checkoutData.segments.forEach(async (segment) => {
        // upsert departureAirport
        const { data: departureAirportData, error: departureAirportError } =
          await supabase
            .from("airports")
            .upsert(
              {
                code: segment.departureAirport.code,
                name: segment.departureAirport.name,
                type: segment.departureAirport.type,
                city: segment.departureAirport.city,
                city_name: segment.departureAirport.cityName,
                country: segment.departureAirport.country,
                country_name: segment.departureAirport.countryName,
                province: segment.departureAirport.province,
              },
              {
                onConflict: "code",
              },
            )
            .select("id")
            .single();

        if (departureAirportError) throw departureAirportError;

        // upsert arrivalAirport
        const { data: arrivalAirportData, error: arrivalAirportError } =
          await supabase
            .from("airports")
            .upsert(
              {
                code: segment.arrivalAirport.code,
                name: segment.arrivalAirport.name,
                type: segment.arrivalAirport.type,
                city: segment.arrivalAirport.city,
                city_name: segment.arrivalAirport.cityName,
                country: segment.arrivalAirport.country,
                country_name: segment.arrivalAirport.countryName,
                province: segment.arrivalAirport.province,
              },
              // {
              //   onConflict: "code",
              // },
            )
            .select("id")
            .single();

        if (arrivalAirportError) throw arrivalAirportError;

        // Upsert carrier
        const { data: carrierData, error: carrierError } = await supabase
          .from("carriers")
          .upsert(
            {
              ...segment.carriersData,
            },
            // {
            //   onConflict: "code",
            // },
          )
          .select("id")
          .single();

        if (carrierError) throw carrierError;

        // Insert segment
        const { data: segmentData, error: segmentError } = await supabase
          .from("booking_segment")
          .insert({
            booking_id: bookingData.id,
            departure_time: new Date(segment.departureTime).toISOString(),
            arrival_time: new Date(segment.arrivalTime).toISOString(),
            departure_airport_id: departureAirportData?.id,
            arrival_airport_id: arrivalAirportData?.id,
            total_time: segment.totalTime,
            cabin_class: segment.cabinClass,
            flight_number: segment.flightNumber,
            carrier_id: carrierData?.id,
          })
          .select("id")
          .single();

        if (segmentError) throw segmentError;

        // Insert checked luggage
        const checkedLuggageData = segment.travellerCheckedLuggage.map(
          (luggage) => ({
            segment_id: segmentData.id,
            traveller_reference: luggage.travellerReference,
            luggage_type: luggage.luggageAllowance.luggageType,
            rule_type: luggage.luggageAllowance.ruleType,
            max_piece: luggage.luggageAllowance.maxPiece,
            max_weight_per_piece: luggage.luggageAllowance.maxWeightPerPiece,
            mass_unit: luggage.luggageAllowance.massUnit,
            is_checked_luggage: true,
          }),
        );

        if (checkedLuggageData.length > 0) {
          const { error: luggageError } = await supabase
            .from("booking_segment_luggage")
            .insert(checkedLuggageData);

          if (luggageError) throw luggageError;
        }

        // Insert cabin luggage
        const cabinLuggageData = segment.travellerCabinLuggage.map(
          (luggage) => ({
            segment_id: segmentData.id,
            traveller_reference: "cabin", // You might want to modify this based on your specific requirements
            luggage_type: luggage.luggageAllowance.luggageType,
            max_piece: luggage.luggageAllowance.maxPiece,
            max_weight_per_piece: luggage.luggageAllowance.maxWeightPerPiece,
            mass_unit: luggage.luggageAllowance.massUnit,
            is_checked_luggage: false,
            size_max_length: luggage.luggageAllowance.sizeRestrictions?.maxLength,
            size_max_width: luggage.luggageAllowance.sizeRestrictions?.maxWidth,
            size_max_height: luggage.luggageAllowance.sizeRestrictions?.maxHeight,
            size_unit: luggage.luggageAllowance.sizeRestrictions?.sizeUnit,
          }),
        );

        if (cabinLuggageData.length > 0) {
          const { error: cabinLuggageError } = await supabase
            .from("booking_segment_luggage")
            .insert(cabinLuggageData);

          if (cabinLuggageError) throw cabinLuggageError;
        }
      });

      return { success: true, bookingId: bookingData.id };
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error };
  }
}