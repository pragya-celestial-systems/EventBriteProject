import React from "react";
import { Box } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate } from "react-router-dom";

function EventCard({ eventData }) {
  const navigate = useNavigate();
  function handleDisplayEventDetails() {
    navigate(`/events/${eventData.id}`);
  }

  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid lightgrey",
        margin: "auto",
      }}
      onClick={handleDisplayEventDetails}
    >
      <Box
        sx={{
          height: "125px",
          width: "125px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "1rem",
        }}
      >
        <ImageIcon
          sx={{ height: "150px", width: "150px", color: "lightgrey" }}
        />
      </Box>
      <Box>
        <h1 style={{ color: "grey" }}>{eventData.name.text}</h1>
      </Box>
    </Box>
  );
}

export default EventCard;
