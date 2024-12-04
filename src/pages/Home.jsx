import axios from "axios";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Events from "../components/Events";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../store/services";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector(state => state.events);

  useEffect(() => {
    // fetchEvents();
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    setEvents(state);
  }, [state])
  
  console.log(state);
  // async function fetchEvents() {
  //   axios.get(
  //       "https://www.eventbriteapi.com/v3/organizations/2522570207741/events/", {
  //         headers: {
  //           Authorization: "Bearer W5HK74QVWJYSUK2OXRTO",
  //         },})
  //       .then(response => {
  //         setEvents(response.data.events);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       })
  // }

  return (
    <div>
      <Categories />
      <Events events={events} isLoading={loading}/>
    </div>
  );
}

export default Home;
