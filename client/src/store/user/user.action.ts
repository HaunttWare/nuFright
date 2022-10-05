import { USER_ACTIONS_TYPES } from "./user.types"; 
import { createAction } from "@reduxjs/toolkit";

export const setCurrentUser = (user: any) => // <-- this function sets the user in the store 
    createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user); // <-- this function creates the action object

