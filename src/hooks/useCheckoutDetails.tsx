import {
  ActionTypes,
  FlightCheckoutDetailsContext,
} from "@/context/FlightCheckoutDetailsContext";
import { CheckoutInterface } from "@/types/checkout.type";
import { useContext } from "react";

export default function useCheckoutDetails() {
  const { state, dispatch } = useContext(FlightCheckoutDetailsContext);

  function updateCheckoutDetails(payload: Partial<CheckoutInterface>) {
    dispatch({
      type: ActionTypes.UPDATE_CHECKOUT_DETAIL,
      payload,
    });
  }

  return {
    checkoutDetails: state,
    updateCheckoutDetails,
  };
}
