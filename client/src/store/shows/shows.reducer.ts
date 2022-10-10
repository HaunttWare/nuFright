import { SHOWS_ACTIONS_TYPES } from "./shows.types";

interface ShowsState {
  shows: any
}
const initialState = {
  shows: []
}

type Action = { type: "SHOWS_ACTIONS_TYPES", payload: {}}

export const showsReducer = (state: ShowsState = initialState, action: any) => {
  switch(action.type) {
    case SHOWS_ACTIONS_TYPES.SET_CURRENT_SHOWS: {
      return {
        ...state,
        shows: action.payload
      }
    }
    default: 
      return state;
  }
}