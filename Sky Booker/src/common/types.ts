import { setupStore, store } from "../app/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

type status = "idle" | "loading" | "succeeded" | "failed";

type error = string | null | undefined;

export interface Airport {
  id: number;
  code: string;
  title: string;
}

export interface Booking {
  id ?: string;
  firstName: string,
  lastName: string,
  departureAirportId: number,
  arrivalAirportId: number,
  departureDate: string,
  returnDate: string
}

export interface AirportsSliceState {
  airports: Airport[];
  status: status;
  error: error;
}

export interface BookingsSliceState {
  bookings: Booking[];
  status: status;
  error: error;
}
