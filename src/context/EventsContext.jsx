import React, { createContext, useContext, useEffect, useState } from "react";

const eventsContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <eventsContext.Provider
      value={{ events, setEvents, isLoading, setIsLoading }}
    >
      {children}
    </eventsContext.Provider>
  );
}

export function useEventContext() {
  return useContext(eventsContext);
}
