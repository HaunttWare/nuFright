import axios from 'axios';
import React from 'react';
import Unrated from "./unrated.component";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectRatingList } from "../../store/ratings/ratings.selector";

const Rating = (id: { id: string; }) => {
  const currentUser = useSelector(selectCurrentUser);
  const userRatings = useSelector(selectRatingList);
  const horrorId = id;

  return (
    <Unrated id={id.id} />
  )
};

export default Rating;