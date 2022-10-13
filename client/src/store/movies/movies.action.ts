import { MOVIES_ACTIONS_TYPES } from "./movies.types";
import { createAction } from "../utils/createAction";
import { BooScale, Likes, Saved } from "@prisma/client";

export type MoviesData = {
  id: string,
  title: string,
  description: string, 
  genres: string,
  type: string,
  images: string,
  ratings: BooScale,
  likedBy: [Likes],
  savedBy: [Saved]
};

export const setCurrentMovies = (
  movies: MoviesData | null
) => createAction(MOVIES_ACTIONS_TYPES.SET_CURRENT_MOVIES, movies);