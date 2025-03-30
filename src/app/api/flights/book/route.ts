import { createBooking } from "@/data/server/booking";
import { CheckoutInterface } from "@/types/checkout.type";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const checkoutData: CheckoutInterface = await req.json();

    // Validate the checkout data
    if (!checkoutData) {
      return Response.json(
        { error: "No checkout data provided" },
        { status: 400 },
      );
    }
    console.log({ checkoutData: JSON.stringify(checkoutData, null, 2) });
    try {
      const result = await createBooking(checkoutData);
      console.log({ result });
      if (result.success) {
        return Response.json({ bookingId: result.bookingId }, { status: 200 });
      } else {
        return Response.json(
          { error: "Booking creation failed" },
          { status: 500 },
        );
      }
      // return
    } catch (error) {
      console.error("Unhandled error in booking creation:", error);
      return Response.json(
        {
          error: "Internal server error",
          details: error instanceof Error ? error.message : error,
        },
        { status: 500 },
      );
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    Response.json(
      { details: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }
}
