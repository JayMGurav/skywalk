import { BookingForm } from "@/components/booking-form";
import { Suspense } from "react";

function BookingFormSlotDefault(){
    return (
        <Suspense>
            <BookingForm />
        </Suspense>
    )
}

export default BookingFormSlotDefault;