import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://www.eventbriteapi.com/v3/organizations/2522570207741/events/`,
        formData,
        {
          headers: {
            Authorization: "Bearer W5HK74QVWJYSUK2OXRTO",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data.error_description || "Failed to add event");
      }

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.error_description || "Something went wrong"
      );
    }
  }
);

export const getEvents = createAsyncThunk('events/getEvents', async(_, thunkAPI) => {
    
})