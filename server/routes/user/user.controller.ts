import { Request, Response } from "express";
import { db } from "../../prisma/utils/db.server";

export const getUserLikedBooks = async (req: Request, res: Response) => {
  // Get the user id from the request
  // query the db for the liked books of the user with that id
  // return the books
  const { id } = req.params;
  const likedBooks = await db.likes.findMany({
    where: {
      userId: id,
    },
    include: {
      Book: true,
    },
  });
  res.json(likedBooks);
};

export const getUserLikedMovies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const likedMovies = await db.cinema.findMany({
    where: {
      type: "movie",
      Likes: {
        some: {
          userId: id,
        },
      },
    },
  });
  res.json(likedMovies);
};

export const getUserLikedShows = async (req: Request, res: Response) => {
  const { id } = req.params;

  const likedShows = await db.cinema.findMany({
    where: {
      type: "show",
      Likes: {
        some: {
          userId: id,
        },
      },
    },
  });
  res.json(likedShows);
};

export const getUserSavedMovies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const savedMovies = await db.cinema.findMany({
    where: {
      type: "movie",
      Saved: {
        some: {
          userId: id,
        },
      },
    },
  });
  res.json(savedMovies);
};

export const getUserSavedShows = async (req: Request, res: Response) => {
  const { id } = req.params;

  const savedShows = await db.cinema.findMany({
    where: {
      type: "show",
      Saved: {
        some: {
          userId: id,
        },
      },
    },
  });
  res.json(savedShows);
};


