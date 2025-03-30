"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FlightOfferInterface } from "@/types/flight.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, intervalToDuration } from "date-fns";
import { FlightDetailDialog } from "./flight-detail-dialog";
import { Skeleton } from "./ui/skeleton";

export default function FlightDisplayCard({
  flightOffer,
  tags,
  nextActionBtn,
}: {
  flightOffer: FlightOfferInterface;
  tags?: Array<string>;
  nextActionBtn?: boolean;
}) {
  return (
    <Card className="w-full my-4 bg-background">
      {tags && tags?.length > 0 && (
        <CardHeader className="flex gap-2">
          {tags?.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-green-100 border border-green-700 text-green-700"
            >
              {tag}
            </Badge>
          ))}
        </CardHeader>
      )}
      <CardContent>
        {flightOffer?.segments?.map(({ legs }, index: number) => {
          const {
            departureAirport,
            arrivalAirport,
            departureTime,
            arrivalTime,
            totalTime,
            carriersData,
          } = legs[0];
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
                  <AvatarImage src={carriersData?.[0]?.logo} />
                  <AvatarFallback>{carriersData?.[0]?.code}</AvatarFallback>
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
      <CardFooter className="border-t flex items-center justify-end">
        <span className="text-lg font-bold mx-4">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: flightOffer?.priceBreakdown?.total?.currencyCode,
          }).format(
            flightOffer?.priceBreakdown?.total?.units +
              Number(`0.${flightOffer?.priceBreakdown?.total?.nanos}`),
          )}
        </span>

        <FlightDetailDialog
          token={flightOffer?.token}
          nextActionBtn={nextActionBtn}
        />
      </CardFooter>
    </Card>
  );
}


export function FlightDisplayCardSkeleton(){
  const segmentsArray = Array(1).fill(null);
  
  return (
    <Card className="w-full my-4 bg-background">
      <CardHeader className="flex flex-row gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </CardHeader>
      <CardContent>
        {segmentsArray.map((_, index) => (
          <div
            key={`segment_skeleton_${index}`}
            className="flex items-center justify-between gap-4 my-4 px-2"
          >
            <div className="flex">
              <Skeleton className="w-14 h-14 mr-4 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-16 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex-1 relative">
              <Separator className="absolute" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-center">
                <Skeleton className="h-6 w-16 rounded-full mx-auto" />
                <Skeleton className="h-4 w-20 mt-2 mx-auto" />
              </div>
            </div>
            <div className="text-center">
              <Skeleton className="h-5 w-16 mb-2 ml-auto" />
              <Skeleton className="h-4 w-28 ml-auto" />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t flex items-center justify-end">
        <Skeleton className="h-6 w-24 mx-4" />
        <Skeleton className="h-10 w-24 rounded" />
      </CardFooter>
    </Card>
  );
}