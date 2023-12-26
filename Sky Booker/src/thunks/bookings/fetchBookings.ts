import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_BOOKINGS_URL } from "../../../common/paths";

export const fetchBookings = createAsyncThunk(
  "airports/fetchBookings",
  async () => {
    const response = await fetch(GET_BOOKINGS_URL);
    const data = await response.json();

    return data;
  }
);