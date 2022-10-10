import { Request, Response } from "express";
import axios from "axios";
import { db } from "../../prisma/utils/db.server";
import { config } from "../../config";

export const getBooks = (req: Request, res: Response) => {
  axios
    .get("https://hapi-books.p.rapidapi.com/week/horror", {
      headers: {
        "x-rapidapi-host": "hapi-books.p.rapidapi.com",
        "x-rapidapi-key": config.HAPI_BOOK_API_KEY,
      },
    })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getBook = (req: Request, res: Response) => {
  axios
    .get(`https://hapi-books.p.rapidapi.com/book/${req.params.id}`, {
      headers: {
        "x-rapidapi-host": "hapi-books.p.rapidapi.com",
        "x-rapidapi-key": config.HAPI_BOOK_API_KEY,
      },
    })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const likeBook = async (req: Request, res: Response) => {
  const { bookId, userId } = req.body;
  const like = await db.likes.create({
    data: {
      bookId,
      userId,
      isLiked: true,
    },
  });
  res.json(like);
};
