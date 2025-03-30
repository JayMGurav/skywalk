/* eslint @typescript-eslint/no-explicit-any:0 */

// Price type that is reused in multiple interfaces
interface Price {
  currencyCode: string;
  units: number;
  nanos: number;
}

interface CarrierData {
  name: string;
  code: string;
  logo: string;
}

interface CarrierInfo {
  operatingCarrier: string;
  marketingCarrier: string;
  operatingCarrierDisclosureText?: string;
}

// LuggageAllowance type to be reused in various luggage-related interfaces
interface LuggageAllowance {
  luggageType: string;
  ruleType?: string;
  maxPiece: number;
  maxWeightPerPiece?: number;
  maxTotalWeight?: number;
  massUnit: string;
  sizeRestrictions?: {
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    sizeUnit: string;
  };
}

interface Location {
  city: string;
  cityName: string;
  country: string;
  countryName: string;
  province?: string;
}

export interface Airport {
  type: string;
  code: string;
  name: string;
  city: string;
  cityName: string;
  country: string;
  countryName: string;
  province?: string;
}

interface FlightInfo {
  facilities: any[];
  flightNumber: number;
  planeType: string;
  carrierInfo: CarrierInfo;
}

interface Leg {
  departureTime: string;
  arrivalTime: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  cabinClass: string;
  flightInfo: FlightInfo;
  carriers: string[];
  carriersData: CarrierData[];
  totalTime: number;
  flightStops: any[];
  amenities: any[];
}

interface Segment {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  legs: Leg[];
  totalTime: number;
  travellerCheckedLuggage: TravellerCheckedLuggage[];
  travellerCabinLuggage: TravellerCabinLuggage[];
  isAtolProtected: boolean;
  showWarningDestinationAirport: boolean;
  showWarningOriginAirport: boolean;
}

// TravellerLuggage type that can be extended for checked and cabin luggage
interface TravellerLuggage {
  travellerReference: string;
  luggageAllowance: LuggageAllowance;
}

interface TravellerCheckedLuggage extends TravellerLuggage {
  luggageAllowance: LuggageAllowance;
}

interface TravellerCabinLuggage extends TravellerLuggage {
  personalItem: boolean;
}

interface TravellerProduct {
  travellerReference: string;
  travellerProducts: Product[];
}

interface Product {
  type: string;
  product: LuggageAllowance;
}

interface OfferExtras {
  flexibleTicket: FlexibleTicket;
}

interface FlexibleTicket {
  airProductReference: string;
  travellers: string[];
  recommendation: {
    recommended: boolean;
    confidence: string;
  };
  priceBreakdown: PriceBreakdown;
  supplierInfo: {
    name: string;
    termsUrl: string;
    privacyPolicyUrl: string;
  };
}

interface Ancillaries {
  flexibleTicket: FlexibleTicket;
}

interface PriceBreakdown {
  total: Price;
  baseFare: Price;
  fee: Price;
  tax: Price;
  totalRounded: Price;
  discount: Price;
  totalWithoutDiscount: Price;
  totalWithoutDiscountRounded: Price;
  carrierTaxBreakdown: {
    carrier: CarrierData;
    avgPerAdult: Price;
  }[];
}

interface TravellerPriceBreakdown {
  total: Price;
  baseFare: Price;
  fee: Price;
  tax: Price;
  totalRounded: Price;
  discount: Price;
  totalWithoutDiscount: Price;
  totalWithoutDiscountRounded: Price;
}

interface TravellerPrice {
  travellerPriceBreakdown: TravellerPriceBreakdown;
  travellerReference: string;
  travellerType: string;
}

export interface FlightDealInterface {
  key: string;
  offerToken: string;
  price: Price;
  priceRounded: Price;
  travellerPrices: TravellerPrice[];
}

interface UnifiedPriceBreakdown {
  price: Price;
  items: Array<{
    scope: string;
    id: string;
    title: string;
    price: Price;
    items: any[];
  }>;
  addedItems: any[];
}

export interface FlightOfferInterface {
  token: string;
  segments: Segment[];
  priceBreakdown: PriceBreakdown;
  travellerPrices: TravellerPrice[];
  priceDisplayRequirements: any[];
  pointOfSale: string;
  tripType: string;
  includedProductsBySegment: TravellerProduct[][];
  includedProducts: {
    areAllSegmentsIdentical: boolean;
    segments: Array<{
      luggageType: string;
      maxPiece: number;
      piecePerPax: number;
    }>;
  };
  extraProducts: any[];
  offerExtras: OfferExtras;
  ancillaries: Ancillaries;
  appliedDiscounts: any[];
  offerKeyToHighlight: string;
  extraProductDisplayRequirements: any;
  unifiedPriceBreakdown: UnifiedPriceBreakdown;
  badges: Array<{
    text: string;
  }>;
  carbonEmissions: {
    footprintForOffer: {
      quantity: number;
      unit: string;
      status: string;
      average: number;
      percentageDifference: number;
    };
  };
}
