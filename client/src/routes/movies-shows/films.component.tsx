import React, { useState } from "react";
import Movies from "./movies.component";
import Shows from "./shows.component";

const Films = () => {
  const [showShows, setShowShows] = useState(false);
  return (
    <div className="container">
      <h1 
      style={{
        fontFamily: 'montserrat', 
        display: 'flex', 
        justifyContent: "center", 
        alignContent: 'center', 
        color: "whitesmoke", 
        fontSize: "2.5em"
        }} >Films</h1>
      <div 
        className="tabs"
        style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}
      >
        <button
          className={`btn btn-outline-danger tab m-1 ${!showShows && "active"}`}
          onClick={() => setShowShows(false)}
        >
          Movies
        </button>
        <button

          className={`btn btn-outline-danger tab m-1 ${showShows && "active"}`}
          onClick={() => setShowShows(true)}
        >
          Shows
        </button>
      </div>
      {showShows ? <Shows /> : <Movies />}
    </div>
  );
};

export default Films;
