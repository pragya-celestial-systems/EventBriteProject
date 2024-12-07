import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/organizations/${process.env.ORG_ID}/events/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.PRIVATE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response.data.error_description || "Failed to add event"
        );
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

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/organizations/${process.env.ORG_ID}/events/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PRIVATE_TOKEN}`,
          },
        }
      );

      return response.data.events;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getEvent = async (id) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/events/${id}/`, {
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
