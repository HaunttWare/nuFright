import express from "express";
import {
  getAllUsers,
  followUser,
  getFollowers,
  getFollowing,
  getUserLikedMovies,
  getUserLikedShows,
  getUserSavedMovies,
  getUserSavedShows,
  getUserRatingsNBadges,
} from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/follow/:userId", followUser);
userRouter.get("/followers/:currentUserId", getFollowers);
userRouter.get("/followings/:currentUserId", getFollowing);

userRouter.get("/:id/liked-movies", getUserLikedMovies);
userRouter.get("/:id/liked-shows", getUserLikedShows);

userRouter.get("/:id/saved-movies", getUserSavedMovies);
userRouter.get("/:id/saved-shows", getUserSavedShows);

userRouter.get("/:id/ratings-badges", getUserRatingsNBadges);

export default userRouter;
