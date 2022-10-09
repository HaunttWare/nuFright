import express from "express";

import authRouter from "./auth/auth.router";
import storyRouter from './stories/stories.router';
import booksRouter from "./books/books.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use("/books", booksRouter);


export default rootRouter;

