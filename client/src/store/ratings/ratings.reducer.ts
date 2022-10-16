import { RATING_ACTIONS_TYPES } from "./ratings.types";

const INITIAL_STATE = {
  ratingList: [],
}

export const ratingsReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case RATING_ACTIONS_TYPES.SET_RATING_LIST:
      return {
        ...state,
        ratingList: payload,
      };
    default:
      return state;
  }
};