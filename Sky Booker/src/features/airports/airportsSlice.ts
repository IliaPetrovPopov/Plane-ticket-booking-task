import { createSlice } from "@reduxjs/toolkit";
import { fetchAirports } from "../../thunks/airports/fetchAirports";
import { RootState } from "../../../common/types";
import { AirportsSliceState } from "../../../common/types";

const initialState: AirportsSliceState = {
  airports: [],
  status: "idle",
  error: null,
};

const airportsSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.airports = action.payload;
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllAirports = (state: RootState) => state.airports.airports;
export const getStatus = (state: RootState) => state.airports.status;

export default airportsSlice.reducer;
