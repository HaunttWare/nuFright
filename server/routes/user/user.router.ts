import express from 'express';
import {getUserLikedBooks, getUserLikedMovies, getUserLikedShows, getUserSavedMovies, getUserSavedShows} from './user.controller';

const userRouter = express.Router();

// userRouter.get('/:id/liked-books', getUserLikedBooks);

userRouter.get('/:id/liked-movies', getUserLikedMovies);

userRouter.get('/:id/liked-shows', getUserLikedShows);

userRouter.get('/:id/saved-movies', getUserSavedMovies);

userRouter.get('/:id/saved-shows', getUserSavedShows);


export default userRouter;