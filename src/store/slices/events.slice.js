import { createSlice } from "@reduxjs/toolkit";
import { addEvent } from "../services";

const eventsSlice = createSlice({
    name: "eventSlice",
    initialState: [],
    extraReducers: builder => {
        builder.addCase(addEvent.fulfilled, (state, action) => {
            return [...state, action.payload];
        })
    }
})

export default eventsSlice.reducer;