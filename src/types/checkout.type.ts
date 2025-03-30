import { CabinClassEnum } from "./booking.type";
import { Airport } from "./flight.types";
import { Gender } from "./user.types";

export type Price = {
  currencyCode: string;
  units: number;
  nanos: number;
};

export type Segment = {
  departureTime: Date;
  arrivalTime: Date;
  departureAirport: Airport;
  arrivalAirport: Airport;
  totalTime: number;
  cabinClass: CabinClassEnum;
  flightNumber: string;
  carriersData: {
    name: string;
    code: string;
    logo: string;
  };
  travellerCheckedLuggage: Array<{
    travellerReference: string;
    luggageAllowance: {
      luggageType: string;
      ruleType: string;
      maxPiece: number;
      maxWeightPerPiece: number;
      massUnit: string;
    };
  }>;
  travellerCabinLuggage: Array<{
    travellerReference: string;
    luggageAllowance: {
      luggageType: string;
      maxPiece: number;
      maxWeightPerPiece?: number;
      massUnit: string;
      sizeRestrictions?: {
        maxLength: number;
        maxWidth: number;
        maxHeight: number;
        sizeUnit: string;
      };
    }
  }>;
};

export interface CheckoutInterface {
  numberOfTravellers: number;
  travellers: Array<{
    firstName: string;
    lastName: string;
    gender: Gender
  }>;
  token: string;
  ticketType: "standard" | "flexible";
  contactDetails: {
    email: string;
    phone: string;
  };
  segments: Array<Segment>;
  priceBreakdown: {
    total: Price;
    baseFare: Price;
    tax: Price;
  };
  totalPrice: string;
}


// CREATE TYPE ticket_type AS ENUM ('standard', 'flexible');