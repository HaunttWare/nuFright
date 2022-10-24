import { USER_ACTIONS_TYPES } from "./user.types";
import { createAction } from "../utils/createAction";
export type UserData = {
  id?: string;
  googleId: string;
  name: string;
  email: string;
  photo: string;
};

export const setCurrentUser = (
  user: UserData | null 
) => createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user); 

export const setFollowingList = (following: UserData[]) =>
  createAction(USER_ACTIONS_TYPES.SET_FOLLOWING_LIST, following);

export const setFollowerList = (followers: UserData[]) =>
  createAction(USER_ACTIONS_TYPES.SET_FOLLOWER_LIST, followers);
