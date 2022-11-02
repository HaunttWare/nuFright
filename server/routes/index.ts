import express from "express";

import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import chatRouter from "./chat/chat.router";
import messageRouter from "./message/message.router";
import MovieRouter from "./movies/movies.routes";
import showsRouter from "./shows/shows.routes";
import booksRouter from "./books/books.routes";
import imageRouter from "./images/images.routes";
import storyRouter from "./stories/stories.routes";
import PlaylistRouter from "./playlists/playlists.routes";
import ratingRouter from "./ratings/rating.router";
import scrapperRouter from "./scrapper/scrapper.routes";
import likesRouter from "./likes/likes.routes";
import badgeRouter from "./badges/badge.routes";
import commentRouter from "./comments/comment.router";
import SongsRouter from "./songs/songs.routes";

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouter);
rootRouter.use("/message", messageRouter);

rootRouter.use("/events", scrapperRouter);
rootRouter.use("/movies", MovieRouter);
rootRouter.use("/shows", showsRouter);
rootRouter.use("/books", booksRouter);
rootRouter.use("/images", imageRouter);
rootRouter.use("/story", storyRouter);
rootRouter.use("/playlists", PlaylistRouter);
rootRouter.use('/songs', SongsRouter)

rootRouter.use("/ratings", ratingRouter);
rootRouter.use("/likes", likesRouter);
rootRouter.use("/badges", badgeRouter);
rootRouter.use("/comments", commentRouter);

export default rootRouter;
