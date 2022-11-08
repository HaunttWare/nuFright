import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rated from "./rated.component";

import { useSelector } from "react-redux";
import { selectRatingList } from "../../store/ratings/ratings.selector";

const Rating = ({id, type}: {id: string; type: string;} ) => {
  const userRatings = useSelector(selectRatingList);
  const [rated, setRated] = useState(false);
  const [score, setScore] = useState(0);
 

  useEffect(() => {
    userRatings.forEach((rateObj: { id: string, rating: number }) => {
      if (rateObj.id.includes(id)) {
        setScore(rateObj.rating);
      }
    })
  }, [])

  return (
    <div>
      <Rated id={id} score={score} setScore={setScore} type={type} />
    </div>
  )
};

export default Rating;