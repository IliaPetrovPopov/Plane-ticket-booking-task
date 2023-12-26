import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_AIRPORTS_URL } from "../../../common/paths";

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async () => {
    const response = await fetch(GET_AIRPORTS_URL);
    const data = await response.json();

    return data;
  }
);
