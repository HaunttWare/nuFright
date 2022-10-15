import {Request, Response} from 'express';
import {db} from '../../prisma/utils/db.server';

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
}

const getComments = (req: Request, res: Response) => {
  db.comment.findMany({})
  .then(results => res.status(200).json(results))
  .catch(() => res.sendStatus(500));
}

const postComment = (req: Request, res: Response) => {
  const {body: {userId, message, category, horrorId}} = req;
  console.log(req.params)
  const commentObj = {
    data: {
      message,
      userId,
      cinemaId: null,
      imagesId: null,
      bookId: null,
      storiesId: null
    },
    select: COMMENT_SELECT_FIELDS,
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

export {postComment, getComments};