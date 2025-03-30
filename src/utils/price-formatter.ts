import { Price } from "@/types/checkout.type";

export function priceFormatter({ currencyCode, units, nanos }: Price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(units + Number(`0.${nanos}`));
}
