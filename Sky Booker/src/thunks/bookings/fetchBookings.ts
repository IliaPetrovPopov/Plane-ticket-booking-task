import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_BOOKINGS_URL } from "../../common/paths";

interface QueryParamsPropTypes {
  pageIndex: number;
  pageSize: number;
}

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (queryParams: QueryParamsPropTypes) => {
    const GET_BOOKINGS_URL = `${BASE_BOOKINGS_URL}?pageIndex=${
      queryParams.pageIndex
    }&pageSize=${queryParams.pageSize}&authToken=${
      import.meta.env.VITE_API_AUTH_KEY
    }`;
    const response = await fetch(GET_BOOKINGS_URL);

    const data = await response?.json();
    
    return data;
  }
);
