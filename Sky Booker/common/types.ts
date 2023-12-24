import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type status = "idle" | "loading" | "succeeded" | "failed";

type error = string | null;

interface AirportsSliceState {
  airports: [];
  status: status;
  error: error;
}
