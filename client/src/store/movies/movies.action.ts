import { MOVIES_ACTIONS_TYPES } from "./movies.types";
import { createAction } from "../utils/createAction";
export type MoviesData = {

};

export const setCurrentUserMovies = (
  movies: MoviesData | null
) => createAction(MOVIES_ACTIONS_TYPES.SET_CURRENT_MOVIES, movies);