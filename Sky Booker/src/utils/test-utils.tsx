import React, { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../app/store";
import { AppStore, RootState } from "../common/types";
// As a basic setup, import your same slice reducers

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const preloadedState: RootState = {
  airports: {
    airports: [
      {
        id: 100,
        code: "TBS",
        title: "Tbilisi International Airport",
      },
      {
        id: 101,
        code: "IBZ",
        title: "Ibiza Airport",
      },
    ],
    status: "idle",
    error: null,
  },
  bookings: {
    bookings: [
      {
        id: "2000",
        firstName: "Alexis",
        lastName: "Doe",
        departureAirportId: 100,
        arrivalAirportId: 101,
        departureDate: "2024-12-29T00:00:00.000Z",
        returnDate: "2024-12-30T00:00:00.000Z",
      },
    ],
    status: "idle",
    error: null,
  },
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
