import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OneWayBookingForm } from "./oneway-booking-form";
import { RoundTripBookingForm } from "./roundtrip-booking-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// only to be called in page that have relative result page as well
export function BookingForm() {
  return (
    <Card className="flex-1 p-6 bg-background shadow-lg">
      <CardHeader>
        <CardTitle>Flight Booking</CardTitle>
        <CardDescription>Search for your next flight</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="one_way" className="w-full">
          <TabsList className="mb-8 mt-0">
            <TabsTrigger value="one_way" className="px-8">
              One-Way
            </TabsTrigger>
            <TabsTrigger value="roundtrip" className="px-8">
              Roundtrip
            </TabsTrigger>
          </TabsList>
          <TabsContent value="one_way">
            <OneWayBookingForm />
          </TabsContent>
          <TabsContent value="roundtrip">
            <RoundTripBookingForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
