"use client";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CircleOff } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutStep } from "@/types/booking.type";
import useCheckoutDetails from "@/hooks/useCheckoutDetails";
import Link from "next/link";

export function SelectTicketType() {
  const { checkoutDetails, updateCheckoutDetails } = useCheckoutDetails();

  return (
    <div className="w-full py-6">
      <div>
        <span className="text-sm">
          Traveller(s): {checkoutDetails?.numberOfTravellers}
          {" | "}
          {format(
            checkoutDetails?.segments?.[0]?.departureTime as Date,
            "E do MMM",
          )}
          {" - "}
          {format(
            checkoutDetails?.segments?.[0]?.arrivalTime as Date,
            "E do MMM",
          )}
        </span>
        <h1 className="text-2xl font-bold">
          {checkoutDetails?.segments[0]?.departureAirport?.cityName} to{" "}
          {checkoutDetails?.segments[0]?.arrivalAirport?.cityName}
        </h1>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Select your ticket type</h2>
      </div>
      <div className="flex mt-4 gap-4 w-full">
        <Card className="flex-1/3 h-fit">
          <CardHeader>
            <CardTitle>Standard ticket</CardTitle>
            <CardDescription>
              Total Price {checkoutDetails?.totalPrice}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul>
              <li className="flex gap-2 mb-4 items-center">
                <Check className="w-4 h-4" /> Cheapest price
              </li>
              <li className="flex gap-2 mb-4 items-center">
                <CircleOff className="w-4 h-4" /> No need for flexibility -
                you're sure of your plans
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href={"/dashboard/checkout/passenger_details"}
              onClick={() => {
                updateCheckoutDetails({
                  ticketType: "standard",
                });
              }}
            >
              <Button className="w-full">Continue</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex-1/3 h-fit">
          <CardHeader>
            <CardTitle>Flexible ticket</CardTitle>
            <CardDescription>
              Total Price {checkoutDetails?.totalPrice} + 1.5k
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <span className="flex gap-2 mb-4 items-center">
              <Check className="w-4 h-4" /> Change your flight time or date
              once, up to 24 hours before departure time
            </span>
            <span className="flex gap-2 mb-4 items-center">
              <Check className="w-4 h-4" />
              Travel with the same airline and route as originally booked
            </span>
            <span className="flex gap-2 mb-4 items-center">
              <Check className="w-4 h-4" />
              No change fees – pay only the fare difference, if any
            </span>
            <Separator className="my-4" />
            <span className="font-bold">How to make a change</span>
            <ul className="flex flex-col mt-4 gap-4">
              <li>
                Contact our Customer Service via live chat or phone 24 hours
                before departure time of your original flight
              </li>
              <li>
                We will share available flights that match your change request
              </li>
              <li>
                We will assist you with any fare difference payment and confirm
                your new flight
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              href={"/dashboard/checkout/passenger_details"}
              onClick={() => {
                updateCheckoutDetails({
                  ticketType: "flexible",
                });
              }}
            >
              <Button className="w-full">Continue</Button>
            </Link>
          </CardFooter>
        </Card>
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
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
