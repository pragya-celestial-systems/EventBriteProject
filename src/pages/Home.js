import axios from "axios";
import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await axios.get(
      "https://www.eventbriteapi.com/v3/organizations/2522570207741/events/",
      {
        headers: {
          Authorization: "Bearer W5HK74QVWJYSUK2OXRTO",
        },
      }
    );

    console.log(data);
  }

  return <div>Home Page</div>;
}

export default Home;
