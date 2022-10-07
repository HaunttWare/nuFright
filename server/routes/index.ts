import express from "express";

import authRouter from "./auth/auth.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;

