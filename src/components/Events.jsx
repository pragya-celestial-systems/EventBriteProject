import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Event from "./Event";

function Events({ events }) {
  return (
    <Box sx={{width: '70%', margin: 'auto', cursor:'pointer'}}>
    <Box sx={{marginBottom: '2rem'}}>
        <b>Total Events: </b> {events.length || 0}
    </Box>
      {/* {isLoading ? (
        <Box
          sx={{
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
      ) : ( */}
        <Box>
          {events &&
            events.length > 0 &&
            events.map((event, index) => (
              <Event key={index} eventData={event} />
            ))}
        </Box>
      {/* )} */}
    </Box>
  );
}

export default Events;
