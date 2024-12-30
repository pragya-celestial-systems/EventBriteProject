import React from "react";
import Category from "./Category";
import { makeStyles } from "@mui/styles";

const categories = [
  {
    title: "Concert",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFDj3sBYj-PFKWODsLFt9C80qLCOxYAqkrw&s",
  },
  {
    title: "Festivals",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3Re8LDLxBZsmJqC6RvQ9zh2QJgJOX7Sp3w&s",
  },
  {
    title: "Sports",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSJ-IbCSJAy9q-ZT3sd91dwVxtBZ7m9WAXw&s",
  },
  {
    title: "Politics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZ-6M7rjEJlgpudbElLXvAEO_ZkSDiwJiKQ&s",
  },
];

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    margin: "2rem auto",
  },
});

function Categories({}) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
}

export default Categories;
