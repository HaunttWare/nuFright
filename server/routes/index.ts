import express from "express";

import authRouter from "./auth/auth.router";
import storyRouter from './stories/stories.router';

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/story', storyRouter);

export default rootRouter;

