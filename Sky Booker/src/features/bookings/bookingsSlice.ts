import { createSlice } from "@reduxjs/toolkit";
import { postBooking } from "../../thunks/bookings/postBooking";
import { Booking, BookingsSliceState, RootState } from "../../common/types";
import { fetchBookings } from "../../thunks/bookings/fetchBookings";

const initialState: BookingsSliceState = {
  bookings: [],
  status: "idle",
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBooking.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = [...state.bookings, action.payload.list][0];   
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const getAllBookings = (state: RootState) => state.bookings.bookings;
export const getBookingsStatus = (state: RootState) => state.bookings.status;

export default bookingsSlice.reducer;
