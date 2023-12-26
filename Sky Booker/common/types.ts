import { store } from "../src/app/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type status = "idle" | "loading" | "succeeded" | "failed";

type error = string | null | undefined;

export interface Airport {
  id: number;
  code: string;
  title: string
}

export interface AirportsSliceState {
  airports: Airport[];
  status: status;
  error: error;
}
