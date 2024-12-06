import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { useSelector } from "react-redux";
import { useEventContext } from "../context/EventsContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Searchbar() {
  const [searchVal, setSearchVal] = React.useState("");
  const state = useSelector((state) => state.events);
  const { setEvents } = useEventContext();

  const handleChangeValue = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredEvents = state.filter((event) => {
      const name = event.name?.text?.toLowerCase().trim() || "";
      const summary = event.summary?.toLowerCase().trim() || "";
      const search = searchVal.toLowerCase().trim();
      return name.includes(search) || summary.includes(search);
    });

    setEvents(filteredEvents);
  };

  return (
    <form onSubmit={handleSearch}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={handleChangeValue}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </form>
  );
}

export default Searchbar;
