import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/events.slice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
