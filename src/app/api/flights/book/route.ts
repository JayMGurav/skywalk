import { createBooking } from "@/data/server/booking";
import { CheckoutInterface } from "@/types/checkout.type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
    try {

      const supabase = await createClient();
      
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if(!user){
        console.error("User not found, please login!");
        revalidatePath("/", "layout");
        Response.redirect("/login");
      }


      const result = await createBooking(checkoutData);
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
