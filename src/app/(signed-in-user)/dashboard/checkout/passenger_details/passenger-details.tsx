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
import {
  Backpack,
  BriefcaseBusiness,
  Luggage,
  MoveRight,
  Plus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCheckoutDetails from "@/hooks/useCheckoutDetails";
import { AddTraveller } from "./add-traveller-details";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoggedInUser } from "@/types/user.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Phone number should be atleast 10 digits",
    })
    .max(13, {
      message: "Phone number should be max 13 digits",
    }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

type updateProfileValues = z.infer<typeof schema>;

export function PassengerDetails({ user }: { user?: LoggedInUser }) {
  const router = useRouter();
  const { checkoutDetails, updateCheckoutDetails } = useCheckoutDetails();

  const form = useForm<updateProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

  function onSubmit(values: updateProfileValues) {
    updateCheckoutDetails({
      contactDetails: values,
    });
    toast.success("Successfully updated the contact details");
  }

  return (
    <div className="w-full py-6">
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
          {checkoutDetails?.segments?.[0]?.departureAirport?.cityName} to{" "}
          {checkoutDetails?.segments?.[0]?.arrivalAirport?.cityName}
        </h1>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold">Fill your details</h2>
      </div>
      <div className="flex mt-4 gap-4 w-full">
        <Card className="flex-1/3 h-fit">
          <CardHeader>
            <CardTitle className="flex-block justify-between items-center">
              Traveller(s):
            </CardTitle>
            <CardDescription>
              {checkoutDetails?.numberOfTravellers} Traveller(s) Boarding the
              flight
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            {(!checkoutDetails?.travellers ||
              checkoutDetails?.travellers?.length <= 0) && (
              <div className=" flex items-center space-x-4 rounded-md border p-3 my-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Add Traveller Details
                  </p>
                  <p className="text-sm text-muted-foreground">
                    These details will appear in the plane ticket
                  </p>
                </div>
                <AddTraveller
                  numberOfTravellers={
                    checkoutDetails?.numberOfTravellers as number
                  }
                />
              </div>
            )}
            <ul className="flex gap-2">
              {checkoutDetails?.travellers?.map((traveller, i) => (
                <li key={`traveller_${traveller.firstName}_${i}`}>
                  {traveller.firstName} {traveller.lastName} |{" "}
                  {traveller.gender}
                </li>
              ))}
            </ul>
            <Separator className="my-8" />
            <div className="flex flex-col gap-4 pl-3">
              {checkoutDetails?.segments?.map((segment: any, i) => (
                <div key={`segment_details_${i}`}>
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
                      (checkedInLuggage: any, index: number) => (
                        <div
                          className="flex items-center gap-2"
                          key={`segment_details_travellerChecked_Luggage_${index}`}
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
                    {segment?.travellerCabinLuggage?.map(
                      (cabinBag: any, i: number) => (
                        <div
                          className="flex items-center gap-2"
                          key={`segment_travellerCabinLuggage_luggage_${i}`}
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
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}

        <Card className="flex-1/3 h-fit">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>Fill your contact details here</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Phone Number</FormLabel>
                      <Input type="text" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <Input type="email" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="mb-3"
                  disabled={Boolean(checkoutDetails?.contactDetails?.email)}
                >
                  {Boolean(checkoutDetails?.contactDetails?.email)
                    ? "Saved"
                    : "Save"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              Continue
            </Button>
          </CardFooter>
        </Card>

        {/* Flight fare details */}

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
                              ?.currencyCode ?? "INR",
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
                            checkoutDetails?.priceBreakdown?.tax?.currencyCode ?? "INR",
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
              <b>{checkoutDetails?.totalPrice}</b>
            </div>
            <div className="text-sm mt-4">
              Includes taxes and charges, No hidden fees - track your price at
              every step
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex items-center justify-end mt-20">
        <Button
          disabled={
            !checkoutDetails?.travellers || !checkoutDetails?.contactDetails
          }
          onClick={() => {
            router.push(`/dashboard/checkout/check_and_pay`);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
