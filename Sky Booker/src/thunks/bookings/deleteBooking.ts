import { createAsyncThunk } from "@reduxjs/toolkit";
import { Booking } from "../../common/types";
import { DELETE_BOOKING_URL } from "../../common/paths";

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (requestData: Booking) => {
    const { id } = requestData;
    const DELETE_URL = `${DELETE_BOOKING_URL}/${id}?authToken=${
      import.meta.env.VITE_API_AUTH_KEY
    }`;

    await fetch(DELETE_URL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return id;
  }
);
