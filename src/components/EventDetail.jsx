import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import { getEvent } from "../store/services";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90svh",
    width: "100svw",
    flexDirection: "column",
  },
  message: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "grey",
    fontFamily: "sans-serif",
  },
  imageAlt: { color: "grey" },
  imageBox: {
    background: "whitesmoke",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "225px",
  },
  mainContainer: {
    padding: "2rem",
    boxShadow: "0 0 10px lightgrey",
    height: "70vh",
    width: "60vw",
  },
});

const venues = [
  {
    id: "244569023",
    name: "Noida",
  },
  {
    id: "244568983",
    name: "Gurgaon",
  },
  {
    id: "244567443",
    name: "Greater Noida",
  },
  {
    id: "244569083",
    name: "Delhi",
  },
];

function EventDetail() {
  const styles = useStyles();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState("");

  useEffect(() => {
    if (id) {
      getEvent(id)
        .then((data) => {
          setEventData(data);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (eventData) {
      if (!eventData.online_event && eventData.venue_id) {
        let location = venues.find(
          (location) => location.id === eventData.venue_id
        );

        if (location) {
          setVenue(location.name);
        }
      }
    }
  }, [eventData]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>Loading event details...</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Event Details</h1>
      <Box className={styles.mainContainer}>
        {eventData ? (
          <div>
            <div className={styles.imageBox}>
              <h1 className={styles.imageAlt}>Image 2 X 10</h1>
            </div>
            <h2>{eventData.name?.text}</h2>
            <p>{eventData.description?.text}</p>
            <p>
              <strong>Start:</strong> {eventData.start?.local}
            </p>
            <p>
              <strong>End:</strong> {eventData.end?.local}
            </p>
            {!eventData.online_event && venue && (
              <p>
                <strong>Venue:</strong> {venue}
              </p>
            )}
            <p>
              <strong>Event Type:</strong>{" "}
              {eventData.online_event ? "Online" : "Offline"}
            </p>
          </div>
        ) : (
          <div className={styles.container}>
            <p className={styles.message}>No event details available.</p>
          </div>
        )}
      </Box>
    </div>
  );
}

export default EventDetail;
