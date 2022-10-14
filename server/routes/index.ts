import express from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import imageRouter from "./images/images.router";
import MovieRouter from "./movies/movies.router";
import storyRouter from './stories/stories.router';
import booksRouter from "./books/books.router";
import badgeRouter from "./badges/badge.router";
import showsRouter from "./shows/shows.router";
import commentRouter from "./comments/comment.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use('/images', imageRouter);
rootRouter.use('/movies', MovieRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use('/shows', showsRouter);
rootRouter.use("/books", booksRouter);
rootRouter.use('/badges', badgeRouter);
rootRouter.use('/comments', commentRouter);


export default rootRouter;

