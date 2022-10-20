import { Request, Response } from "express";
import { db } from "../../prisma/utils/db.server";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// api/user?search=User
export const getAllUsers = async (req: Request, res: Response) => {
  const { search, currentUserId } = req.query;

  try {
    // check if search query is present and return users that match the search query
    // be case insensitive
    // dont return the current user
    if (search) {
      const users = await db.user.findMany({
        where: {
          OR: [
            { name: { contains: search as string, mode: "insensitive" } },
            { name: { contains: search as string, mode: "insensitive" } },
          ],
          NOT: { id: currentUserId as string },
        },
      });
      res.status(200).json(users);
    }
    // if no search query is present, return nothing
    else {
      res.status(200).json([]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//This was to get all online users (keep for later)
// export const getAllUsers = async (req: Request, res: Response) => {
//   const { userIds } = req.query as any;
// console.log(userIds)
//   // get users that match the userIds
//   try {
//     const users = await db.user.findMany({
//       where: {
//         id: {
//           in: userIds,
//         },
//       },
//     });
//     res.status(200).json(users);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
      book: true,
    },
  });
  res.json(likedBooks);
};

export const getUserLikedMovies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const likedMovies = await db.cinema.findMany({
    where: {
      type: "movie",
      likedBy: {
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
      likedBy: {
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
      savedBy: {
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
      savedBy: {
        some: {
          userId: id,
        },
      },
    },
  });
  res.json(savedShows);
};

export const getUserRatingsNBadges = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const RatingsNBadges = await db.user.findUnique({
      where: { id },
      include: {
        ratings: true,
        badges: true,
      },
    });
    const rateArr = RatingsNBadges?.ratings.map((rating) => {
      const horrorId = rating.id.split("=")[1];
      return {
        id: rating.id,
        horrorId,
        rating: rating.rating,
      };
    });
    const badgeArr = RatingsNBadges?.badges.map((badge) => ({
      id: badge.id,
      name: badge.name,
      description: badge.description,
      badge: badge.badge,
    }));
    res.json({
      success: true,
      message: "retrieved user badges and ratings",
      badges: badgeArr,
      ratings: rateArr,
    });
  } catch (err) {
    console.error("error getting Ratings and Badges\n", err);
    res.sendStatus(500);
  }
};
