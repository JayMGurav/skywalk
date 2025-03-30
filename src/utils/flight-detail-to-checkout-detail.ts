import { CheckoutInterface } from "@/types/checkout.type";
import { priceFormatter } from "./price-formatter";
import { CabinClassEnum } from "@/types/booking.type";

export function flightDetailToCheckoutDetail(
  flightDetails: any,
): CheckoutInterface {
  const numberOfTravellers = flightDetails?.travellers?.reduce(
    (acc: any, curr: any) => {
      return acc + Number(curr.travellerReference);
    },
    0,
  );

  const totalPrice = priceFormatter({
    currencyCode: flightDetails?.priceBreakdown?.total?.currencyCode,
    units: flightDetails?.priceBreakdown?.total?.units,
    nanos: flightDetails.priceBreakdown?.total?.nanos,
  });

  const segments = flightDetails?.segments?.map((segment: any) => ({
    departureTime: new Date(segment?.departureTime),
    arrivalTime: new Date(segment?.arrivalTime),
    totalTime: segment.totalTime,
    departureAirport: segment?.departureAirport,
    arrivalAirport: segment?.arrivalAirport,
    travellerCheckedLuggage: segment?.travellerCheckedLuggage,
    travellerCabinLuggage: segment?.travellerCabinLuggage,
    cabinClass: String(
      segment?.legs?.[0]?.cabinClass,
    ).toLowerCase() as CabinClassEnum,
    flightNumber: segment?.legs?.[0]?.flightInfo?.flightNumber,
    carriersData: segment?.legs?.[0]?.carriersData?.[0],
  }));

  const priceBreakdown = {
    total: flightDetails?.priceBreakdown?.total,
    baseFare: flightDetails?.priceBreakdown?.baseFare,
    tax: flightDetails?.priceBreakdown?.tax,
  };

  return {
    numberOfTravellers,
    travellers: [],
    ticketType: "standard",
    token: flightDetails?.token,
    contactDetails: {
      email: "",
      phone: "",
    },
    segments,
    priceBreakdown,
    totalPrice,
  };
}
