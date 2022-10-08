import express from "express";

import authRouter from "./auth/auth.router";
import MovieRouter from "./movies/movies.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use('/movies', MovieRouter);

export default rootRouter;

