import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Event from "./Event";
import { useEventContext } from "../context/EventsContext";

function Events() {
  const {events, isLoading} = useEventContext();
  console.log(events[0]);
  return (
    <Box sx={{width: '70%', margin: 'auto', cursor:'pointer'}}>
    <Box sx={{margin: '2rem'}}>
        <b>Result: </b> {events?.length || 0}
    </Box>
      {isLoading ? (
        <Box
          sx={{
            margin: 'auto',
            height: "60vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: '1rem'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{margin: 'auto'}}>
          {events &&
            events.length > 0 &&
            events.map((event, index) => (
              <Event key={index} eventData={event} />
            ))}
        </Box>
      )}
    </Box>
  );
}

export default Events;
