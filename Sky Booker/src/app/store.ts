import { configureStore } from "@reduxjs/toolkit";
import airportsReducer from "../features/airports/airportsSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";

export const store = configureStore({
  reducer: {
    airports: airportsReducer,
    bookings: bookingsReducer,
  },
});
