import { createAsyncThunk } from "@reduxjs/toolkit";

export const addEvent = createAsyncThunk('event/addEvent', async(formData, thunkAPI) => {
    console.log(formData);
})