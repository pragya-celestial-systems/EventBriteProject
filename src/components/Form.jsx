import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch } from "react-redux";
import { addEvent } from "../store/services";

const initialState = {
  title: "",
  venue: "",
  startDate: "",
  endDate: "",
  description: "",
  category: "",
  eventType: "",
};

const useStyles = makeStyles({
  formContainer: {
    width: "60%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "center",
  },
});

function Form() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({ isError: false, message: "" });
  const styles = useStyles();
  const dispatch = useDispatch();

  function handleChangeValue(e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function validateInput() {
    if (
      !formData.title ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description ||
      !formData.eventType
    ) {
      return { error: true, message: "Please fill all the fields" };
    }

    if (Number(formData.ticketPrice) < 0) {
      return {
        error: true,
        message: "The ticket price can't be a negative number",
      };
    }

    return { error: false, message: "" };
  }

  function getCurrentDateTimeInISO(dateStr) {
    const dateObj = new Date(dateStr);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toTimeString().split(" ")[0];
    return `${date}T${time}Z`;
  }

  function handleCreateEvent(e) {
    e.preventDefault();

    const validation = validateInput();
    if (validation.error) {
      setError({ isError: true, message: validation.message });
      return;
    }

    try {
      const formDataJSON = createEventData();
      const response = dispatch(addEvent(formDataJSON));
      response.then((res) => {
        if (res.error && res.error.message === "Rejected") {
          toast.error(res.payload);
          return;
        } else {
          toast.success("Event created successfully");
          setError({ isError: false, message: "" });
          setFormData(initialState);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  }

  function handleReset() {
    setFormData(initialState);
    setError({ isError: false, message: "" });
  }

  function createEventData() {
    return {
      event: {
        name: {
          html: formData.title,
        },
        description: {
          html: formData.description,
        },
        start: {
          timezone: "UTC",
          utc: getCurrentDateTimeInISO(formData.startDate),
        },
        end: {
          timezone: "UTC",
          utc: getCurrentDateTimeInISO(formData.endDate),
        },
        venue_id: formData.venue,
        online_event: formData.eventType === "online",
        capacity: 100,
        currency: "USD",
      },
    };
  }

  return (
    <>
      <h1 className={styles.heading}>Create An Event</h1>
      <form onSubmit={handleCreateEvent} className={styles.formContainer}>
        {error.isError && (
          <Alert sx={{ marginBottom: "1rem" }} severity="error">
            {error.message}
          </Alert>
        )}
        <InputLabel>Event Title</InputLabel>
        <TextField
          variant="outlined"
          name="title"
          onChange={handleChangeValue}
          value={formData.title}
        />
        <InputLabel>Venue</InputLabel>
        <Select
          name="venue"
          value={formData.venue}
          label="Venue"
          onChange={handleChangeValue}
        >
          <MenuItem value="244569023">Noida</MenuItem>
          <MenuItem value="244569083">Delhi</MenuItem>
          <MenuItem value="244568983">Gurgaon</MenuItem>
        </Select>
        <InputLabel>Start Date</InputLabel>
        <TextField
          variant="outlined"
          type="date"
          name="startDate"
          onChange={handleChangeValue}
          value={formData.startDate}
        />
        <InputLabel>End Date</InputLabel>
        <TextField
          variant="outlined"
          type="date"
          name="endDate"
          onChange={handleChangeValue}
          value={formData.endDate}
        />
        <InputLabel>Description</InputLabel>
        <TextField
          variant="outlined"
          name="description"
          onChange={handleChangeValue}
          value={formData.description}
          minRows={5}
        />
        <InputLabel>Event Type</InputLabel>
        <Select
          name="eventType"
          value={formData.eventType}
          onChange={handleChangeValue}
        >
          <MenuItem value="offline">Offline</MenuItem>
          <MenuItem value="online">Online</MenuItem>
        </Select>

        <Box mt={2}>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReset}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </Box>
      </form>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default Form;
