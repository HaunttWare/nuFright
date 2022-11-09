import express from 'express';
import {getUser, getUserLikedBooks, getUserLikedMovies, getUserLikedShows, getUsers, getUserSavedMovies, getUserSavedShows, getUserRatingsNBadges} from './user.controller';

const userRouter = express.Router();

// userRouter.get('/:id/liked-books', getUserLikedBooks);
// userRouter.get('/:id', getUser)

// get all users
userRouter.get('/', getUsers);

userRouter.get('/:id/liked-movies', getUserLikedMovies);

userRouter.get('/:id/liked-shows', getUserLikedShows);

userRouter.get('/:id/saved-movies', getUserSavedMovies);

userRouter.get('/:id/saved-shows', getUserSavedShows);

userRouter.get('/:id/ratings-badges', getUserRatingsNBadges);


export default userRouter;
