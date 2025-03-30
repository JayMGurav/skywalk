import { Suspense } from "react";
import { BookingDetailsSkeleton, MyBookingList } from "./my-bookings-list";

export default function MyBookingsPage() {
  return (
    <Suspense fallback={<BookingDetailsSkeleton/>}>
      <MyBookingList />
    </Suspense>
  );
}
