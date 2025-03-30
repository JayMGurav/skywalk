"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Button } from "./ui/button";
import { format, intervalToDuration } from "date-fns";
import { Separator } from "./ui/separator";
import { Backpack, BriefcaseBusiness, Loader2, Luggage } from "lucide-react";
import { useRouter } from "next/navigation";
import useCheckoutDetails from "@/hooks/useCheckoutDetails";
import { flightDetailToCheckoutDetail } from "@/utils/flight-detail-to-checkout-detail";
import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url, {
    headers: {
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    },
  }).then((res) => res.json());
};

export function FlightDetailDialog({
  nextActionBtn,
  token,
}: {
  nextActionBtn?: boolean;
  token: string;
}) {
  const router = useRouter();
  const { updateCheckoutDetails } = useCheckoutDetails();
  const url = new URL(
    `${process.env.NEXT_PUBLIC_RAPID_API_URL}/api/v1/flights/getFlightDetails`,
  );

  const params = url.searchParams;
  params.append("token", token);
  params.append("currency_code", "INR");

  const { data, error, isLoading } = useSWR(
    token ? url.toString() : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error) {
    return (
      <div className="w-full min-h-50 flex items-center justify-center">
        something went wrong
      </div>
    );
  }
  

  function initiateCheckoutSteps(data: any) {
    const checkoutDetails = flightDetailToCheckoutDetail(data);
    updateCheckoutDetails(checkoutDetails);

    router.push(`/dashboard/checkout/select_ticket_type`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isLoading}>
          {isLoading && <><Loader2 className="animate-spin"/>Fetching flight details</>}
          {!isLoading && <>View Detail</>}
        </Button>
      </DialogTrigger>
      {data?.data && <DialogContent className="min-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle>
            Your flight to{" "}
            {data?.data?.segments?.[0]?.arrivalAirport?.cityName}
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          {data?.data?.segments?.map((segment: any, index: number) => {
            const flightDuration = intervalToDuration({
              start: 0,
              end: segment?.totalTime * 1000,
            });
            return (
              <div key={`Segment_${index}`} className="my-6 ">
                <h2 className="leading-tight my-0 font-bold">
                  Your flight to {segment?.arrivalAirport?.cityName}
                </h2>
                <div
                  key={`segment_${index}`}
                  className="flex items-center justify-between gap-5 my-4 px-2"
                >
                  <div className="flex">
                    <Avatar className="w-14 h-14 mr-4 p-2 bg-card/50 rounded-lg shadow border">
                      <AvatarImage
                        src={segment?.legs?.[0]?.carriersData?.[0]?.logo}
                      />
                      <AvatarFallback>
                        {segment?.legs?.[0]?.carriersData?.[0]?.code}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-md font-semibold">
                        {format(new Date(segment?.departureTime), "HH:mm")}
                      </p>
                      <span className="text-sm">
                        {segment?.departureAirport?.code} |{" "}
                        {format(new Date(segment?.departureTime), "do MMM")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <Separator className="absolute" />
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-center">
                      <Badge>Direct</Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {flightDuration.hours}h {flightDuration.minutes}m
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {format(new Date(segment?.arrivalTime), "HH:mm")}
                    </p>
                    <span className="text-sm">
                      {segment?.arrivalAirport?.code} |{" "}
                      {format(new Date(segment?.arrivalTime), "do MMM")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <Separator className="mt-16" />

          <div className="flex py-3">
            <div className="flex-1/3 border-r">
              <h2 className="leading-tight my-0 font-bold">Included baggage</h2>
              <span>The total baggage included in the price</span>
            </div>
            <div className="flex-2/3 flex flex-col gap-4 pl-3">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness />
                <div>
                  <p>1 personal item</p>
                  <p>Fits under the seat in front of you</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Backpack />
                <div>
                  <p>
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.maxPiece
                    }{" "}
                    cabin bag
                  </p>
                  <p>
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.sizeRestrictions?.maxHeight
                    }{" "}
                    x{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.sizeRestrictions?.maxWidth
                    }{" "}
                    x{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.sizeRestrictions?.maxLength
                    }{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.sizeRestrictions?.sizeUnit
                    }{" "}
                    | Max Weight{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.maxWeightPerPiece
                    }{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCabinLuggage?.[0]
                        ?.luggageAllowance?.massUnit
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Luggage />
                <div>
                  <p>
                    {
                      data?.data?.segments?.[0]?.travellerCheckedLuggage?.[0]
                        ?.luggageAllowance?.maxPiece
                    }{" "}
                    checked bag
                  </p>
                  <p>
                    Max Weight{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCheckedLuggage?.[0]
                        ?.luggageAllowance?.maxWeightPerPiece
                    }{" "}
                    {
                      data?.data?.segments?.[0]?.travellerCheckedLuggage?.[0]
                        ?.luggageAllowance?.massUnit
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="mt-3" />

          <div className="flex py-3">
            <div className="flex-1/3 border-r">
              <h2 className=" font-bold">CO2e emissions estimate</h2>
              <span className="text-sm">
                Air travel by nature is a high emissions form of travel. By
                providing insight into how the CO2e emissions of this flight
                compares to similar flights, we want to help you make an
                informed choice about your flight.
              </span>
            </div>
            <div className="flex-2/3 pl-3">Typical for this route</div>
          </div>
        </div>
        <DialogFooter>
          {data?.data?.priceBreakdown?.total?.currencyCode && (
            <span className="text-lg font-bold mx-4">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: data?.data?.priceBreakdown?.total?.currencyCode,
              }).format(
                data?.data?.priceBreakdown?.total?.units +
                  Number(`0.${data?.data?.priceBreakdown?.total?.nanos}`),
              )}
            </span>
          )}
          {nextActionBtn && (
            <Button onClick={() => initiateCheckoutSteps(data?.data)}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>}
    </Dialog>
  );
}
