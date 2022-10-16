import { RATING_ACTIONS_TYPES } from "./ratings.types";
import { createAction } from "../utils/createAction";


export type ratingData = {
  name: String;
  description: String;
  badge: String;
};

export const setBadgeList = (ratingList: ratingData[] | [null]) => {
 return createAction(RATING_ACTIONS_TYPES.SET_RATING_LIST, ratingList)
};