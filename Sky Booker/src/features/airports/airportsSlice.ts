import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  airports: [],
  status: "idle",
  error: null,
};

const airportsSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {},
});

export default airportsSlice.reducer;
