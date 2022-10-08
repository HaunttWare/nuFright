import { MOVIES_ACTIONS_TYPES } from './movies.types'

interface MoviesState {
  movies: any
}
const initialState = {
  movies: {}
}

type Action = { type: "MOVIES_ACTIONS_TYPES", payload: {}}

export const moviesReducer = (state: MoviesState = initialState, action: any) => {
  switch(action.type) {
    case MOVIES_ACTIONS_TYPES.SET_CURRENT_MOVIES: {
      return {
        ...state,
        movies: [...state.movies, action.payload]
      }
    }
    default:
      return state;
  }
}