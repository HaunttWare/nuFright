import { USER_ACTIONS_TYPES } from "./user.types";

const INITIAL_STATE = { // <-- this object contains the initial state
    currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action: any) => { // <-- this function is the reducer
    const { type, payload } = action; // <-- this destructures the action object

    switch (type) { // <-- this switch statement checks the action type
        case USER_ACTIONS_TYPES.SET_CURRENT_USER: // <-- this case sets the user in the store
            return {
                ...state,
                currentUser: payload,
            };
        default: // <-- this case returns the default state
            return state;
    }
}
