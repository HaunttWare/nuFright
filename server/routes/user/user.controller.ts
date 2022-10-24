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

export const getAllUsers = async (req: Request, res: Response) => {
  const { search, currentUserId } = req.query;

  try {
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
    } else {
      res.status(200).json([]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { currentUserId, isFollowing } = req.body;

  try {
    const isFollowing = await db.follows.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (isFollowing) {
      await db.follows.delete({
        where: {
          id: isFollowing.id,
        },
      });
      res.status(200).json({ isFollowing: false });
    } else {
      const follow = await db.follows.create({
        data: {
          followerId: currentUserId,
          followingId: userId,
          isFollowing: true,
        },
        include: {
          follower: true,
          following: true,
        },
      });
      res.send(follow);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  const { currentUserId } = req.params;

  try {
    const followers = await db.follows.findMany({
      where: {
        followingId: currentUserId,
      },
      select: {
        follower: true,
      },
    });

    const followersList = followers.map((follower) => follower.follower);
    res.status(200).json(followersList);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  const { currentUserId } = req.params;

  try {
    const following = await db.follows.findMany({
      where: {
        followerId: currentUserId,
      },
      select: {
        following: true,
      },
    });

    const followingUsers = following.map((follow) => follow.following);
    res.status(200).json(followingUsers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserLikedBooks = async (req: Request, res: Response) => {
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
