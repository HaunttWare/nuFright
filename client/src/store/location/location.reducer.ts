import { LOCATION_ACTIONS_TYPES } from "./location.types";

const INITIAL_STATE = {
  currentLocation: null,
};

export const locationReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_ACTIONS_TYPES.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
      default:
        return state;
  }
}