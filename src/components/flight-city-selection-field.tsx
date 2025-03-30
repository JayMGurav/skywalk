"use client";

import { useState, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  // CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useSWR from "swr";
import debounce from "lodash.debounce";
import { CommandLoading } from "cmdk";
import { CityInterface } from "@/types/booking.type";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => {
  return fetch(url, {
    headers: {
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    },
  }).then((res) => res.json());
};

export function FlightCitySelectionField({
  label,
  name,
  idName,
  placeholder,
  form,
}: {
  label: string;
  name: string;
  idName: string;
  placeholder: string;
  callback?: (selectedCity: CityInterface) => void;
  form: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {

  const [cmdDialogOpen, setCmdDialogOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { data, isLoading } = useSWR(
    searchTerm
      ? `${process.env.NEXT_PUBLIC_RAPID_API_URL}/api/v1/flights/searchDestination?query=${searchTerm}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: () => {
        setCmdDialogOpen(true);
      },
      onError: (error) => {
        toast.error("Error fetching city list", {
          description: (
            <pre className="mt-2 w-full rounded-md bg-background p-4">
              <code>{JSON.stringify(error, null, 2)}</code>
            </pre>
          ),
        });
      },
    },
  );
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);

  useEffect(() => {
    const debounceCall = debounce(() => {
      if (inputValue !== selectedCityName) {
        // typed non-selected city, go ahead and search
        setSearchTerm(inputValue);
      }
    }, 1000);
    debounceCall();
    return () => debounceCall.cancel(); // Cleanup debounce on unmount
  }, [inputValue]);


  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Command>
              <CommandInput
                {...field}
                placeholder={placeholder}
                value={inputValue}
                onValueChange={(value) => {
                  setInputValue(value);
                  setCmdDialogOpen(true);
                }}
              />

              <CommandList
                className={cn(
                  cmdDialogOpen &&
                    "absolute top-18 w-full p-2 border bg-inherit rounded-lg",
                )}
              >
                {data?.data?.length <= 0 && (
                  <CommandEmpty>No {label} found</CommandEmpty>
                )}
                {isLoading && (
                  <CommandLoading>
                    <FlightBookingCityCommandItemSkeleton />
                  </CommandLoading>
                )}

                {data?.data?.length > 0 &&
                  cmdDialogOpen &&
                  data?.data?.map((city: CityInterface) => (
                    <CommandItem
                      forceMount
                      key={city.code}
                      onSelect={() => {
                        setInputValue(city.cityName);
                        setCmdDialogOpen(false);
                        form.setValue(name, city.cityName);
                        form.setValue(idName, city.id);
                        setSelectedCityName(city.cityName);
                      }}
                    >
                      <FlightBookingCityCommandItem city={city} />
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FlightBookingCityCommandItemSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function FlightBookingCityCommandItem({ city }: { city: CityInterface }) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={city.photoUri} />
        <AvatarFallback>{city.code}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <span className="leading-tight text-md my-0">
          {city.cityName} ({city.regionName}, {city.country})
        </span>
      </div>
    </div>
  );
}
