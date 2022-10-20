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
  user: UserData | null // <-- this function sets the user in the store
) => createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user); // <-- this function creates the action object
