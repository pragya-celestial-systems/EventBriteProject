import { createSlice } from "@reduxjs/toolkit";
import { addEvent } from "../services";

const eventsSlice = createSlice({
    name: "eventSlice",
    initialState: [],
    reducer: {
        // reset: (state) => {
        //     console.log("state reset");
        //     state.isLoading = false;
        //     state.hasError = false;
        //     state.message = "";
        // }
    },
    extraReducers: builder => {
        builder.addCase(addEvent.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

// export const {reset} = eventsSlice.actions;
export default eventsSlice.reducer;