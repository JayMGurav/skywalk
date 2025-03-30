import { BookingForm } from "@/components/booking-form";
import { Suspense } from "react";

function BookingFormSlot(){
    return (
        <Suspense>
            <BookingForm />
        </Suspense>
    )
}

export default BookingFormSlot;