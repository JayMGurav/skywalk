import { SearchInterface } from "@/types/booking.type";
import { Suspense } from "react";
import FlightResults, { FlightResultsFallback } from "./flight-result";

async function SearchResultsPage({
    searchParams
  }:{
    searchParams: Promise<SearchInterface>
  }) {
    const search_params = await searchParams

    return (
            <div className="w-full">
                <Suspense fallback={<FlightResultsFallback />} key={search_params.departDate}>
                    <FlightResults searchParams={search_params}/>
                </Suspense>
            </div>
    );
    
}

export default SearchResultsPage;