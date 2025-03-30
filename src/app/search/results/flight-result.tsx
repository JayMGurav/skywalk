import FlightDisplayCard, { FlightDisplayCardSkeleton } from "@/components/flight-display-card";
import { getFlights } from "@/data/server/flights";
import { SearchInterface } from "@/types/booking.type";
import { FlightOfferInterface } from "@/types/flight.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";


export default async function FlightResults({searchParams}: {searchParams: SearchInterface}) {
    const flights = await getFlights(searchParams)
    
    
    return (
        <div className="border-t mt-5 pt-10">
            {!flights?.success && (
                <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {flights?.error}
                </AlertDescription>
              </Alert>
            )}
            {flights?.data && flights?.data?.map((flightOffer: FlightOfferInterface, index: number) => {
                return (
                <FlightDisplayCard
                    key={`$flight_offer_${index}`}
                    tags={flightOffer?.badges?.map(
                    ({ text }: { text: string }) => text)}
                    flightOffer={flightOffer}
                    nextActionBtn={true}
                />
                );
            })}
        </div>
    );
}


export function FlightResultsFallback(){
    return (
        <div className="border-t mt-5 pt-10">
            {Array.from({length: 3}, (_, i) => i).map((i) => <FlightDisplayCardSkeleton key={`flight_display_skeleton_${i}`}/>)}
        </div>
    )
}