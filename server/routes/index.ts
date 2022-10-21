import express from "express";

import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import imageRouter from "./images/images.routes";
import MovieRouter from "./movies/movies.routes";
import storyRouter from "./stories/stories.routes";
import booksRouter from "./books/books.routes";
import ratingRouter from "./ratings/rating.router";
import likesRouter  from "./likes/likes.routes";
import badgeRouter from "./badges/badge.routes";
import showsRouter from "./shows/shows.routes";
// import conversationRouter from "./conversation/conversation.routes";
// import messageRouter from "./message/message.routes";
import PlaylistRouter from "./playlists/playlists.routes";
import SongsRouter from "./songs/songs.routes";
import commentRouter from './comments/comment.router';

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use('/images', imageRouter);
rootRouter.use('/movies', MovieRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use('/shows', showsRouter);
rootRouter.use("/books", booksRouter);
rootRouter.use('/ratings', ratingRouter);
rootRouter.use('/likes', likesRouter);
rootRouter.use('/badges', badgeRouter);
// rootRouter.use("/conversations", conversationRouter);
// rootRouter.use("/messages", messageRouter);
rootRouter.use('/comments', commentRouter);
rootRouter.use("/playlists", PlaylistRouter);
rootRouter.use('/songs', SongsRouter)

export default rootRouter;
