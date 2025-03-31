import { Suspense } from "react";
import { BookingDetailsSkeleton } from "./my-bookings-list";

export default async function MyBookingsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <Suspense fallback={<BookingDetailsSkeleton/>}>
        {children}
    </Suspense>
    );
  }
  