import { combineReducers, configureStore } from "@reduxjs/toolkit";
import airportsReducer from "../features/airports/airportsSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";
import { RootState } from "../common/types";

export const store = configureStore({
  reducer: {
    airports: airportsReducer,
    bookings: bookingsReducer,
  },
});

const rootReducer = combineReducers({
  airports: airportsReducer,
  bookings: bookingsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
