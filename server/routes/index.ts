import express from "express";

import authRouter from "./auth/auth.router";
import imageRouter from "./images/images.router";
import MovieRouter from "./movies/movies.router";
import storyRouter from './stories/stories.router';
import booksRouter from "./books/books.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/images', imageRouter);
rootRouter.use('/movies', MovieRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use("/books", booksRouter);


export default rootRouter;

