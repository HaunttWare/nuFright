import express from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import imageRouter from "./images/images.router";
import MovieRouter from "./movies/movies.router";
import storyRouter from './stories/stories.router';
import booksRouter from "./books/books.router";
<<<<<<< HEAD
import ratingRouter from "./ratings/rating.router";
import likesRouter  from "./likes/likes.router";
=======
import badgeRouter from "./badges/badge.router";
>>>>>>> 439d07b22f9fa5577182b7e54a744e900a1b77f0
import showsRouter from "./shows/shows.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use('/images', imageRouter);
rootRouter.use('/movies', MovieRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use('/shows', showsRouter);
rootRouter.use("/books", booksRouter);
<<<<<<< HEAD
rootRouter.use('/ratings', ratingRouter);
rootRouter.use('/likes', likesRouter);
=======
rootRouter.use('/badges', badgeRouter);
>>>>>>> 439d07b22f9fa5577182b7e54a744e900a1b77f0


export default rootRouter;

