import { createSlice } from "@reduxjs/toolkit";
import { addEvent, getEvents } from "../services";

const eventsSlice = createSlice({
  name: "eventSlice",
  initialState: [],
  extraReducers: (builder) => {
    builder
      .addCase(addEvent.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default eventsSlice.reducer;
