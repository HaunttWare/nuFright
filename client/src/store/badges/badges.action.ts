import { BADGES_ACTIONS_TYPES } from "./badges.types";
import { createAction } from "../utils/createAction";


export type badgeData = {
  badgeName: String;
  description: String;
  badge: String;
};

export const setBadgeList = (badgeList: badgeData[] | [null]) => {
  return createAction(BADGES_ACTIONS_TYPES.SET_BADGE_LIST, badgeList)
};