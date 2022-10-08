import express from "express";

import authRouter from "./auth/auth.router";
import imageRouter from "./images/images.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/images', imageRouter);

export default rootRouter;

