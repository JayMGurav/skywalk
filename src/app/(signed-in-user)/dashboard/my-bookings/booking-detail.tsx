import { format } from "date-fns"
import { Clock, CreditCard,  MapPin,  Plane, User, Briefcase, Luggage } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface BookingDetailsProps {
  booking: any
}


export function BookingDetailsDialog({ booking }: BookingDetailsProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "h:mm a")
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const segment = booking.booking_segment[0]
  const traveler = booking.booking_traveller[0]
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button size="sm">View Details</Button>
    </DialogTrigger>
    <DialogContent className="text-sm min-w-4xl max-h-[60vh] overflow-auto">
      <DialogHeader>
        <DialogTitle>Details for {booking.id.substring(0, 8).toUpperCase()}</DialogTitle>
      </DialogHeader>
      <div className="text-sm flex flex-col gap-4">
          {/* Flight Details Card */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle>Flight Details</CardTitle>
            <div className="flex items-center gap-1">
              <img src={segment.carrier.logo || "/placeholder.svg"} alt={segment.carrier.name} className="h-6 w-auto" />
              <span className="font-medium">{segment.carrier.name}</span>
              <span className="text-sm text-muted-foreground">
                {segment.carrier.code}-{segment.flight_number}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(segment.departure_time)}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(segment.departure_time), "MMM dd, yyyy")}</p>
                <p className="text-sm font-medium mt-1">{segment.departure_airport.code}</p>
                <p className="text-xs text-muted-foreground">{segment.departure_airport.city_name}</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(segment.arrival_time)}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(segment.arrival_time),"MMM dd, yyyy")}</p>
                <p className="text-sm font-medium mt-1">{segment.arrival_airport.code}</p>
                <p className="text-xs text-muted-foreground">{segment.arrival_airport.city_name}</p>
              </div>
            </div>
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Departure</h3>
              <div className="">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{segment.departure_airport.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {segment.departure_airport.city_name}, {segment.departure_airport.country_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatTime(segment.departure_time)}, {format(new Date(segment.departure_time), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Arrival</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{segment.arrival_airport.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {segment.arrival_airport.city_name}, {segment.arrival_airport.country_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatTime(segment.arrival_time)}, {format(new Date(segment.arrival_time), "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-sm font-medium mb-3">Flight Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Flight</span>
                </div>
                <p className="text-sm">
                  {segment.carrier.code}-{segment.flight_number}
                </p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Duration</span>
                </div>
                <p className="text-sm">{formatDuration(segment.total_time)}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Class</span>
                </div>
                <p className="text-sm capitalize">{segment.cabin_class}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traveler Information */}
      <Card>
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle>Traveler Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">
                {traveler.first_name} {traveler.last_name}
              </p>
              <p className="text-sm text-muted-foreground capitalize">{traveler.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Baggage Information */}
      <Card>
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle>Baggage Allowance</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segment.booking_segment_luggage.map((luggage: any) => (
              <div key={luggage.id} className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  {luggage.is_checked_luggage ? (
                    <Luggage className="h-6 w-6 text-primary" />
                  ) : (
                    <Briefcase className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{luggage.is_checked_luggage ? "Checked Baggage" : "Cabin Baggage"}</p>
                  <p className="text-sm text-muted-foreground">
                    {luggage.max_piece} piece, {luggage.max_weight_per_piece} {luggage.mass_unit}
                  </p>
                  {!luggage.is_checked_luggage && luggage.size_max_width && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Dimensions: {luggage.size_max_length}" × {luggage.size_max_width}" × {luggage.size_max_height}" (
                      {luggage.size_unit})
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary/10 rounded-full p-3">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Payment Details</p>
              <p className="text-sm text-muted-foreground">Paid on {format(new Date(booking.created_at), "MMM dd, yyyy")}</p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Base Fare</span>
              <span>{booking.base_fare}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Taxes & Fees</span>
              <span>{booking.tax}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center font-medium">
              <span>Total Amount</span>
              <span className="text-lg">{booking.total_price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </DialogContent>
  </Dialog>
  )
}