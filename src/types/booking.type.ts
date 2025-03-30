export interface CityInterface {
  id: string;
  type: string;
  name: string;
  code: string;
  city: string;
  cityName: string;
  regionName: string;
  country: string;
  countryName: string;
  countryNameShort: string;
  photoUri: string;
  distanceToCity: {
    value: number;
    unit: string;
  };
  parent: string;
}

export interface PaginationInterface {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export enum CabinClassEnum {
  ECONOMY = "economy",
  PREMIUM_ECONOMY = "premium economy",
  BUSINESS = "business",
  FIRST = "first",
}

export enum TripTypeEnum {
  ONE_WAY = "one_way",
  ROUND_TRIP = "round_trip",
}

export interface BookingDetailsInterface {
  departureCity?: CityInterface;
  arrivalCity?: CityInterface;
  departureDate?: Date;
  cabinClass?: CabinClassEnum;
  tripType?: TripTypeEnum;
  returnDate?: Date;
  adults?: number;
  // infants: string;
}

export enum CheckoutStep {
  TICKET_TYPE = "TICKET_TYPE",
  PASSENGER_DETAILS = "PASSENGER_DETAILS",
  CHECK_AND_PAY = "CHECK_AND_PAY",
  // BOOK_TICKETS = "BOOK_TICKETS",
}


export interface SearchInterface {
  fromId: string;
  fromCityName: string;
  toId: string;
  toCityName: string;
  departDate: string;
  returnDate?: string;
  adults: string;
  cabinClass: string;
  // infants: string;
}