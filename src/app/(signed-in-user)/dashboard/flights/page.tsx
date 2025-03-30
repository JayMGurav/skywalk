import { BookingForm } from "@/components/booking-form";
import { Suspense } from "react";
// import { BookingSearchResults } from "@/components/booking-search-results";

export default function FlightsPage() {
  return (
    <div className="mx-auto rounded-lg z-40  mb-40 ">
      <Suspense>
        <BookingForm />
      </Suspense>
      {/* <BookingSearchResults /> TODO */}
    </div>
  );
}
