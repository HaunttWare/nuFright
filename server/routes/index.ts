import express from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import imageRouter from "./images/images.router";
import MovieRouter from "./movies/movies.router";
import storyRouter from './stories/stories.router';
import booksRouter from "./books/books.router";
import ratingRouter from "./ratings/rating.router";
import { getHorrorShows } from "./shows/shows.controller";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use('/images', imageRouter);
rootRouter.use('/movies', MovieRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use('/shows', getHorrorShows);
rootRouter.use("/books", booksRouter);
rootRouter.use('/ratings', ratingRouter);

export default rootRouter;

