"use client";
import { CabinClassEnum, TripTypeEnum } from "@/types/booking.type";
import { useForm } from "react-hook-form";
import z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plane } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FlightCitySelectionField } from "./flight-city-selection-field";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const oneWayFormSchema = z.object({
  departureCityId: z.string().min(2, {
    message: "Departure city or airport is required",
  }),
  arrivalCityId: z.string().min(2, {
    message: "Arrival city or airport is required",
  }),
  departureCityName: z.string().min(2, {
    message: "Departure city or airport is required",
  }),
  arrivalCityName: z.string().min(2, {
    message: "Arrival city or airport is required",
  }),
  departureDate: z.date({
    required_error: "Departure date is required",
  }),
  adults: z
    .number()
    .min(1, {
      message: "At least 1 adult passenger is required",
    })
    .max(9, {
      message: "Maximum 9 adults allowed",
    }),
  cabinClass: z.nativeEnum(CabinClassEnum, {
    errorMap: () => ({ message: "Please select a valid cabin class" }),
  }),
  tripType: z.nativeEnum(TripTypeEnum, {
    errorMap: () => ({ message: "Please select a valid trip type" }),
  }),
});

type OneWayFormValues = z.infer<typeof oneWayFormSchema>;

export function OneWayBookingForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const form = useForm<OneWayFormValues>({
    resolver: zodResolver(oneWayFormSchema),
    defaultValues: {
      departureCityId: searchParams.get("fromId") || "",
      departureCityName: searchParams.get("fromCityName") || "",
      arrivalCityName: searchParams.get("toCityName") || "",
      arrivalCityId: searchParams.get("toId") || "",
      departureDate: new Date(searchParams.get("departDate") || new Date()),
      adults: Number(searchParams.get("adults")) || 1,
      tripType: TripTypeEnum.ONE_WAY,
      cabinClass: CabinClassEnum.ECONOMY,
      // infants: 0,
    },
  });
 
  const createQueryString = useCallback(
    (params: Array<{name: string; value: string}>) => {
      
      const newParams = new URLSearchParams(searchParams.toString())
      params.forEach(({name, value}) => {
        newParams.set(name, value)
      })
 
      return newParams.toString()
    },
    [searchParams]
  )

  function onSubmit({
    departureCityId, 
    arrivalCityId, 
    departureCityName,
    arrivalCityName,
    departureDate,
    adults,
    cabinClass
  }: OneWayFormValues) {
    const newSearchParams = createQueryString([
      {name: "fromId", value:departureCityId},
      {name: "toId", value: arrivalCityId},
      {name: "fromCityName", value:departureCityName},
      {name: "toCityName", value: arrivalCityName},
      {name: "departDate", value: format(departureDate, "yyyy-MM-dd")},
      {name: "adults", value: String(adults)},
      {name: "cabinClass", value: String(cabinClass)},
    ])
    // only to be called in booking form

    router.push(pathname + "/results?" + newSearchParams)
  }

  const [selectedAdults, selectedCabinClass] = form.watch([
    "adults",
    "cabinClass",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex gap-3 justify-between w-full items-center">
          <FlightCitySelectionField
            label="Departure City"
            name="departureCityName"
            idName="departureCityId"
            defaultValue={form.getValues().departureCityName}
            placeholder="Select your departure city"
            form={form}
          />
          <FlightCitySelectionField
            label="Arrival City"
            name="arrivalCityName"
            defaultValue={form.getValues().arrivalCityName}
            idName="arrivalCityId"
            placeholder="Select your arrival city"
            form={form}
          />

          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Departure Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Passengers */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="mt-5">
                {selectedAdults} Traveller(s), {selectedCabinClass}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travelers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={9}
                          placeholder="Select number of Travellers"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Select number of passengers(Age 12+) OnBoarding
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cabinClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cabin Class</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred cabin class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(CabinClassEnum).map((cabinClass) => (
                            <SelectItem key={cabinClass} value={cabinClass}>
                              {cabinClass}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select your Comfort</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button type="submit">
          <Plane /> Search Flights
        </Button>
      </form>
    </Form>
  );
}
