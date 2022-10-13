import { SHOWS_ACTIONS_TYPES } from './shows.types';
import { createAction } from '../utils/createAction';
import { BooScale, Likes, Saved } from '@prisma/client';

export type ShowData = {
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

export const setCurrentShows = (
  shows: ShowData | null
) => createAction(SHOWS_ACTIONS_TYPES.SET_CURRENT_SHOWS, shows);