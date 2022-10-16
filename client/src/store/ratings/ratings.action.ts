import { RATING_ACTIONS_TYPES } from "./ratings.types";
import { createAction } from "../utils/createAction";


export type ratingData = {
  id: string;
  rating: number;
};

export const setRatingList = (ratingList: ratingData[] | [null]) => {
 return createAction(RATING_ACTIONS_TYPES.SET_RATING_LIST, ratingList)
};