import { getMyFlightBookings } from "@/data/server/user";

import { format } from "date-fns"
import { CalendarIcon, Mail,  Phone,  User,  } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingDetailsDialog } from "./booking-detail";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export async function MyBookingList() {
  const data = await getMyFlightBookings();

  if(!data){
    <div className="w-full h-[50vh] flex items-center justify-center">
      <p>You haven't booked any flights</p>
      <p>Go ahead and book your next travel <Link href="/dashboard/search">here</Link></p>
    </div>
  }

 return (
  <div className="flex w-full flex-col gap-2 mt-10 px-4">
    {data?.map((booking) => (
      <BookingDetails key={booking.id} booking={booking}/>
    ))}
  </div>
 )
}



export function BookingDetails({ booking }: {booking: any}) {
  return (
    <div className="space-y-6 mx-auto w-full max-w-5xl">
      <Card>
        <CardHeader className=" border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-sm text-muted-foreground">Booking Reference</p>
              <CardTitle className="text-xl">{booking?.id?.substring(0, 8)?.toUpperCase()}</CardTitle>
            </div>
            <Badge variant="outline" className="mt-2 md:mt-0">
              {booking?.ticket_type?.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Booked on {format(new Date(booking?.created_at), "MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking?.number_of_travellers} Traveller</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking?.contact_email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{booking?.contact_phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <BookingDetailsDialog booking={booking}/>
        </CardFooter>
      </Card>
    </div>
  )
}

export function BookingDetailsSkeleton() {
  return (
    <div className="space-y-6 mx-auto w-full max-w-5xl">
     {Array.from({length: 2}, (_, i) => i).map((i) => (
       <Card key={`booking_details_skeleton_${i}`}>
       <CardHeader className=" border-b">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
           <div>
             <p className="text-sm text-muted-foreground">Booking Reference</p>
             <Skeleton className="h-7 w-32 mt-1" />
           </div>
           <Skeleton className="h-6 w-24 mt-2 md:mt-0" />
         </div>
       </CardHeader>
       <CardContent className="pt-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <div className="flex items-center gap-2">
               <CalendarIcon className="h-4 w-4 text-muted-foreground" />
               <Skeleton className="h-4 w-40" />
             </div>
             <div className="flex items-center gap-2">
               <User className="h-4 w-4 text-muted-foreground" />
               <Skeleton className="h-4 w-24" />
             </div>
           </div>
           <div className="space-y-2">
             <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-muted-foreground" />
               <Skeleton className="h-4 w-48" />
             </div>
             <div className="flex items-center gap-2">
               <Phone className="h-4 w-4 text-muted-foreground" />
               <Skeleton className="h-4 w-32" />
             </div>
           </div>
         </div>
       </CardContent>
       <CardFooter className="flex items-center justify-end">
         <Skeleton className="h-9 w-28" />
       </CardFooter>
     </Card>
     ))}
    </div>
  )
}