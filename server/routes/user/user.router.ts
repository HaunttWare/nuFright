import express from "express";
// import { protect } from "../../middleware/authMiddleware";
import {
  getUserLikedMovies,
  getUserLikedShows,
  getAllUsers,
  getUserSavedMovies,
  getUserSavedShows,
  getUserRatingsNBadges,
} from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id/liked-movies", getUserLikedMovies);

userRouter.get("/:id/liked-shows", getUserLikedShows);

userRouter.get("/:id/saved-movies", getUserSavedMovies);

userRouter.get("/:id/saved-shows", getUserSavedShows);

userRouter.get("/:id/ratings-badges", getUserRatingsNBadges);

export default userRouter;