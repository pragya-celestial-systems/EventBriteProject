import React, { createContext, useContext, useState } from "react";

const PaginationContext = createContext();

export function PaginationProvider({children}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
  
    return (
      <PaginationContext.Provider
        value={{
          currentPage,
          setCurrentPage,
          eventsPerPage,
          setEventsPerPage,
          totalPages,
          setTotalPages,
        }}
      >
        {children}
      </PaginationContext.Provider>
    )
}

export function usePaginationContext() {
    return useContext(PaginationContext);
}