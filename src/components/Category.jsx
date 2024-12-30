import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  img: {
    height: "120px",
    width: "120px",
    borderRadius: "100%",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "grey",
  },
});

function Category({ category }) {
  const styles = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem",
        cursor: "pointer",
      }}
    >
      <img src={category.image} alt={category.title} className={styles.img} />
      <p className={styles.title}>{category.title}</p>
    </Box>
  );
}

export default Category;
