import { BADGES_ACTIONS_TYPES } from "./badges.types";

const INITIAL_STATE = {
  badgeList: [],
}

export const badgesReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case BADGES_ACTIONS_TYPES.SET_BADGE_LIST:
      return {
        ...state,
        badgeList: payload,
      };
    default:
      return state;
  }
};