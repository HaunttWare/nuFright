import { MOVIES_ACTIONS_TYPES } from "./movies.types";
import { createAction } from "../utils/createAction";
import { BooScale, Likes, Savedlist } from "@prisma/client";

export type MoviesData = {
  id: string,
  title: string,
  description: string, 
  genres: string,
  type: string,
  images: string,
  ratings: BooScale,
  likedBy: Likes,
  savedBy: Savedlist
};

export const setCurrentMovies = (
  movies: MoviesData | null
) => createAction(MOVIES_ACTIONS_TYPES.SET_CURRENT_MOVIES, movies);