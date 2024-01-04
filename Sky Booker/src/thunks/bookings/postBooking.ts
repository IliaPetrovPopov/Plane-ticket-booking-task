import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST_BOOKING_URL } from "../../common/paths";
import { Booking } from "../../common/types";

export const postBooking = createAsyncThunk(
  "bookings/postBooking",
  async (requestData: Booking) => {
    const response = await fetch(POST_BOOKING_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response?.json();

    return data;
  }
);
