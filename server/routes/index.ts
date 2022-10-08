import express from "express";

import authRouter from "./auth/auth.router";
import images from "./images/images.controller";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/images', images);

export default rootRouter;

