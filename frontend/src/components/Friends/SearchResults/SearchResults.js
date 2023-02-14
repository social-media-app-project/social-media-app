import React, { useState } from "react";
import styles from "./SearchResults.module.css";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

const SearchResults = ({ results, inFocus, user }) => {
  const resStyles = (index = 1) => {
    return {
      top: `${40 * index}px`,
      position: `absolute`,
      backgroundColor: `rgb(0,0,0,.90)`,
      heigh: "10px",
      width: `350px`,
      padding: `12px 10px`,
      left: `10px`,
      border: "2px rgb(220,220,220,.30) solid",
      color: "green",
      fontWeight: "400",
      fontSize: "1.1rem",
    };
  };
  return (
    <div className={styles["main-container"]}>
      {inFocus &&
        results.map((res, index) => {
          return (
            <Link
              style={resStyles(index)}
              key={v4()}
              to={res._id !== user ? `/${res._id}` : "/profile"}
            >
              {res.username}
            </Link>
          );
        })}
    </div>
  );
};

export default SearchResults;
