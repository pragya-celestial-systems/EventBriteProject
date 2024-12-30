import React from "react";
import Pagination from "@mui/material/Pagination";
import { usePaginationContext } from "../context/PaginationContext";

function MUIPagination() {
  const { currentPage, setCurrentPage, totalPages } = usePaginationContext();

  function handlePageChange(event, value) {
    setCurrentPage(value);
  }

  return (
    <Pagination
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
    />
  );
}

export default MUIPagination;
