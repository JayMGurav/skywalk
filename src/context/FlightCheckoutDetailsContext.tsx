"use client";

import { CheckoutInterface } from "@/types/checkout.type";
import { createContext, ReactNode, useReducer } from "react";

export enum ActionTypes {
  UPDATE_CHECKOUT_DETAIL = "UPDATE_BOOKING_DETAIL",
  RESET = "RESET",
}

type State = CheckoutInterface | null;

type Action =
  | {
      type: ActionTypes.UPDATE_CHECKOUT_DETAIL;
      payload: Partial<CheckoutInterface>;
    }
  | { type: ActionTypes.RESET };

export const FlightCheckoutDetailsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: null,
  dispatch: () => {
    return;
  },
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UPDATE_CHECKOUT_DETAIL:
      return {
        ...state,
        ...action.payload,
      } as State;
    case ActionTypes.RESET:
      return null;
    default:
      return state;
  }
};

// const initialState: State = null;

export function FlightCheckoutDetailsContextProvider({
  initialState,
  children,
}: {
  initialState: State;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FlightCheckoutDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </FlightCheckoutDetailsContext.Provider>
  );
}
