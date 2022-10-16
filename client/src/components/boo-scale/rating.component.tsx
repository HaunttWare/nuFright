import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Unrated from "./unrated.component";
import Rated from "./rated.component";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRatingList } from "../../store/ratings/ratings.selector";

const Rating = (id: { id: string; }) => {
  const currentUser = useSelector(selectCurrentUser);
  const userRatings = useSelector(selectRatingList);
  const [rated, setRated] = useState(false);

  const isRated = () => {
    if (rated) {
      return (
        <Rated id={id.id} />
      )
    } else {
      return (
        <Unrated id={id.id} />
      )
    }
  }

  useEffect(() => {
    userRatings.forEach((rateObj: { id: string, rating: number }) => {
      if (rateObj.id.includes(id.id)) {
        setRated(true);
      }
    })
  }, [])

  return (
    <div>
      {isRated()}
    </div>
  )
};

export default Rating;