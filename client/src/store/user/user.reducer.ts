import { UserData } from "./user.action";
import { USER_ACTIONS_TYPES } from "./user.types";

type UserState = {
  currentUser: UserData | null;
  following: UserData[];
  followers: UserData[];
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  following: [],
  followers: [],
};

export const userReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTIONS_TYPES.SET_FOLLOWING_LIST:
      return {
        ...state,
        following: payload,
      };
    case USER_ACTIONS_TYPES.SET_FOLLOWER_LIST:
      return {
        ...state,
        followers: payload,
      };

    default:
      return state;
  }
};
