import { createSlice } from "@reduxjs/toolkit";
import { postBooking } from "../../thunks/bookings/postBooking";
import { Booking, BookingsSliceState, RootState } from "../../common/types";
import { fetchBookings } from "../../thunks/bookings/fetchBookings";
import { deleteBooking } from "../../thunks/bookings/deleteBooking";

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

      // Post Booking
      .addCase(postBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(postBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch Bookings
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = [...state.bookings, ...action.payload.list];
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = state.bookings.filter(
          (booking: Booking) => booking.id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllBookings = (state: RootState) => state.bookings.bookings;
export const getBookingsStatus = (state: RootState) => state.bookings.status;

export default bookingsSlice.reducer;
