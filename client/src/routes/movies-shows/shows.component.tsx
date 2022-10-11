import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentShows, ShowData } from "../../store/shows/shows.action";
import { selectCurrentShows } from "../../store/shows/shows.selector";
import EachShow from "./EachShow.component";

const Shows = () => {
  const currentShows = useSelector(selectCurrentShows);
  const [currentShowsLoaded, setCurrentShowsLoaded] = useState(false);
  const dispatch = useDispatch();

  const getShows = () => {
    axios.get('/shows')
      .then(({ data }) => {
          console.log(data);
          dispatch(setCurrentShows(data));
      })
  };

  useEffect(() => {
    getShows();
    setCurrentShowsLoaded(true);
  }, []);

  console.log('in showssss', currentShows);

return (
  <div className="cinema-container">
    <h1>Shows</h1>
    { currentShows?.map((show: ShowData, i: number) => {
      return (
        <EachShow key={`${show} @ ${i}`} show={show} />
      )
    }) }
  </div>
)
};

export default Shows;
