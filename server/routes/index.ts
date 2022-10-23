import express from "express";

import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import chatRouter from "./chat/chat.router";
import messageRouter from "./message/message.router";
import MovieRouter from "./movies/movies.router";
import showsRouter from "./shows/shows.router";
import booksRouter from "./books/books.router";
import imageRouter from "./images/images.router";
import storyRouter from "./stories/stories.router";
import PlaylistRouter from "./playlists/playlists.routes";
import ratingRouter from "./ratings/rating.router";
import likesRouter from "./likes/likes.router";
import badgeRouter from "./badges/badge.router";
import commentRouter from "./comments/comment.router";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouter);
rootRouter.use("/message", messageRouter);

rootRouter.use("/movies", MovieRouter);
rootRouter.use("/shows", showsRouter);
rootRouter.use("/books", booksRouter);
rootRouter.use("/images", imageRouter);
rootRouter.use("/story", storyRouter);
rootRouter.use("/playlists", PlaylistRouter);

rootRouter.use("/ratings", ratingRouter);
rootRouter.use("/likes", likesRouter);
rootRouter.use("/badges", badgeRouter);
rootRouter.use("/comments", commentRouter);

export default rootRouter;
