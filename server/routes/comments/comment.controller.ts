import {Request, Response} from 'express';
import {db} from '../../prisma/utils/db.server';

const postComment = (req: Request, res: Response) => {
  const {body: {userId, message, category, horrorId}} = req;
  const commentObj = {
    data: {
      message,
      userId,
      cinemaId: null,
      imagesId: null,
      bookId: null,
      storiesId: null
    }
  }
  switch (category) {
    case "book":
     commentObj.data.bookId = horrorId
      break
    case "cinema":
     commentObj.data.cinemaId = horrorId
      break
    case "images":
     commentObj.data.imagesId = horrorId
      break
    case "stories":
     commentObj.data.storiesId = horrorId
      break
  }

  db.comment.create(commentObj)
  .then(data => res.status(201).json(data))
  .catch(() => res.sendStatus(500));
}

export {postComment};