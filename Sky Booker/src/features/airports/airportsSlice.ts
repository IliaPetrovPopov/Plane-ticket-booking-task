import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

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
