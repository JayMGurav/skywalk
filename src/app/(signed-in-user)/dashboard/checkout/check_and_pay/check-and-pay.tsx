"use client";
import useCheckoutDetails from "@/hooks/useCheckoutDetails";
import { format, intervalToDuration } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Backpack,
  Badge,
  BriefcaseBusiness,
  Luggage,
  MoveRight,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function CheckAndPay() {
  const router = useRouter();
  const { checkoutDetails } = useCheckoutDetails();

  if (!checkoutDetails) {
    return (
      <div className="flex h-50 items-center justify-center">
        Something went wrong{" "}
        <Link
          href="/dashboard/search"
          className="ml-2 text-blue-300 underline"
        >
          Try again
        </Link>
      </div>
    );
  }

  async function bookFlight() {

    const response = await fetch("/api/flights/book", {
      method: "POST",
      body: JSON.stringify(checkoutDetails),
    });

    if (response?.status == 200) {
      toast.success("Your Flight Booking Successful", {});
      router.push("/dashboard/my-bookings");
    } else {
      toast.error("Your Flight Booking Failed", {});
    }
  }

  return (
    <div className="w-full p-6">
      <div>
        <span className="text-sm">
          Traveller(s): {checkoutDetails?.numberOfTravellers}
          {" | "}
          {format(
            new Date(checkoutDetails?.segments?.[0]?.departureTime ?? new Date().toDateString()),
            "E do MMM",
          )}
          {" - "}
          {format(
            new Date(checkoutDetails?.segments?.[0]?.arrivalTime ?? new Date().toDateString()),
            "E do MMM",
          )}
        </span>
        <h1 className="text-2xl font-bold">
          {checkoutDetails?.segments[0]?.departureAirport?.cityName} to{" "}
          {checkoutDetails?.segments[0]?.arrivalAirport?.cityName}
        </h1>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Check and pay</h2>
      </div>
      <div className="flex mt-4 gap-4 w-full">
        <div className="flex-2/3">
          <Card>
            <CardContent>
              {checkoutDetails?.segments?.map((segment, index: number) => {
                const {
                  departureAirport,
                  arrivalAirport,
                  departureTime,
                  arrivalTime,
                  totalTime,
                  carriersData,
                } = segment;
                const flightDuration = intervalToDuration({
                  start: 0,
                  end: totalTime * 1000,
                });

                return (
                  <div
                    key={`segment_${index}`}
                    className="flex items-center justify-between gap-4 my-4 px-2"
                  >
                    <div className="flex">
                      <Avatar className="w-14 h-14 mr-4 p-2 bg-card/50 rounded-lg shadow border">
                        <AvatarImage src={carriersData?.logo} />
                        <AvatarFallback>{carriersData?.code}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-md font-semibold">
                          {format(new Date(departureTime), "HH:mm")}
                        </p>
                        <span className="text-sm">
                          {departureAirport?.code} |{" "}
                          {format(new Date(departureTime), "do MMM")}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1  relative">
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
                        {format(new Date(arrivalTime), "HH:mm")}
                      </p>
                      <span className="text-sm">
                        {arrivalAirport?.code} |{" "}
                        {format(new Date(arrivalTime), "do MMM")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="my-10 bg-background ">
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                Verify your contact details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                <li>Email: {checkoutDetails?.contactDetails?.email}</li>
                <li>Phone: {checkoutDetails?.contactDetails?.phone}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="my-10 bg-background ">
            <CardHeader>
              <CardTitle>Traveller Details</CardTitle>
              <CardDescription>
                Verify your Traveller details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkoutDetails?.travellers?.map((traveller, i) => (
                <div
                  className="flex items-center gap-4"
                  key={`traveller_${traveller?.firstName}_${i}`}
                >
                  <User />
                  <ul>
                    <li>
                      Name: {traveller?.firstName} {traveller?.lastName}
                    </li>
                    <li className="">Gender: {traveller?.gender}</li>
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="my-10 bg-background ">
            <CardHeader>
              <CardTitle>Baggage Details</CardTitle>
              <CardDescription>
                Verify your Baggage details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {checkoutDetails?.segments?.map((segment, i) => (
                <div key={`segment_${segment?.departureTime}_${i}`}>
                  <div className="flex items-center gap-2 mb-4 font-thin">
                    {segment?.departureAirport?.cityName} <MoveRight />{" "}
                    {segment?.arrivalAirport?.cityName}
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness />
                    <div>
                      <p>1 personal item</p>
                      <p>Fits under the seat in front of you</p>
                    </div>
                  </div>
                  <div className="my-4">
                    {segment?.travellerCheckedLuggage?.map(
                      (checkedInLuggage: any) => (
                        <div
                          className="flex items-center gap-2"
                          key={`travellerCheckedLuggage${segment?.departureTime}_${i}`}
                        >
                          <Luggage />
                          <div>
                            <p>
                              {checkedInLuggage?.luggageAllowance?.maxPiece}{" "}
                              checked bag
                            </p>
                            <p>
                              Max Weight{" "}
                              {
                                checkedInLuggage?.luggageAllowance
                                  ?.maxWeightPerPiece
                              }{" "}
                              {checkedInLuggage?.luggageAllowance?.massUnit}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="my-4">
                    {segment?.travellerCabinLuggage?.map((cabinBag: any) => (
                      <div
                        className="flex items-center gap-2"
                        key={`travellerCabinLuggage_${segment?.departureTime}_${i}`}
                      >
                        <Backpack />
                        <div>
                          <p>
                            {cabinBag?.luggageAllowance?.maxPiece} cabin bag
                          </p>
                          <p>
                            {
                              cabinBag?.luggageAllowance?.sizeRestrictions
                                ?.maxHeight
                            }{" "}
                            x{" "}
                            {
                              cabinBag?.luggageAllowance?.sizeRestrictions
                                ?.maxWidth
                            }{" "}
                            x{" "}
                            {
                              cabinBag?.luggageAllowance?.sizeRestrictions
                                ?.maxLength
                            }{" "}
                            {
                              cabinBag?.luggageAllowance?.sizeRestrictions
                                ?.sizeUnit
                            }{" "}
                            | Max Weight{" "}
                            {cabinBag?.luggageAllowance?.maxWeightPerPiece}{" "}
                            {cabinBag?.luggageAllowance?.massUnit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              For more detailed baggage information and options, check airline
              baggage policies:
            </CardFooter>
          </Card>
        </div>

        <Card className="flex-1/3 h-fit border-none bg-inherit">
          <CardHeader>
            <CardTitle>Flight</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Adult ({checkoutDetails?.numberOfTravellers})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center justify-between">
                      <span>Base Fare:</span>
                      <span>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency:
                            checkoutDetails?.priceBreakdown?.baseFare
                              ?.currencyCode,
                        }).format(
                          (checkoutDetails?.priceBreakdown?.baseFare?.units ||
                            0) +
                            Number(
                              `0.${checkoutDetails?.priceBreakdown?.baseFare?.nanos}`,
                            ),
                        )}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Airline taxes and charges:</span>
                      <span>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency:
                            checkoutDetails?.priceBreakdown?.tax?.currencyCode,
                        }).format(
                          (checkoutDetails?.priceBreakdown?.tax?.units || 0) +
                            Number(
                              `0.${checkoutDetails?.priceBreakdown?.tax?.nanos}`,
                            ),
                        )}
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="border-t block">
            <div className="flex items-center justify-between w-full">
              <b>Total:</b>
              <b>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency:
                    checkoutDetails?.priceBreakdown?.total?.currencyCode,
                }).format(
                  (checkoutDetails?.priceBreakdown?.total?.units || 0) +
                    Number(
                      `0.${checkoutDetails?.priceBreakdown?.total?.nanos}`,
                    ),
                )}
              </b>
            </div>
            <div className="text-sm mt-4">
              Includes taxes and charges, No hidden fees - track your price at
              every step
            </div>
            <Button className="w-full mt-4" onClick={() => bookFlight()}>
              Pay Now And Book Flight
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
