import React, { useEffect } from "react";
import Events from "../components/Events";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../store/services";
import { useEventContext } from "../context/EventsContext";
import MUIPagination from "../components/MUIPagination";
import { usePaginationContext } from "../context/PaginationContext";

function Home() {
  const { setEvents, setIsLoading } = useEventContext();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const { currentPage, eventsPerPage, setTotalPages } = usePaginationContext();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEvents()).finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (events.length) {
      const totalPages = Math.ceil(events.length / eventsPerPage);
      setTotalPages(totalPages);

      const startIndex = (currentPage - 1) * eventsPerPage;
      const endIndex = startIndex + eventsPerPage;
      setEvents(events.slice(startIndex, endIndex));
    }
  }, [events, currentPage, eventsPerPage, setTotalPages, setEvents]);

  return (
    <>
      <Events />
      <MUIPagination />
    </>
  );
}

export default Home;
