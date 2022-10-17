import {Request, Response} from 'express';
import {db} from '../../prisma/utils/db.server';

const getComments = (req: Request, res: Response) => {
  const {params: {_id}} = req;
 
  db.comment.findMany({})
  .then(results => res.status(200).json(results))
  .catch(() => res.sendStatus(500));
}

const postComment = (req: Request, res: Response) => {
  const {body: {userId, message, cinemaId, imagesId, bookId, storiesId, category}, params: {_id}} = req;
  
  const commentObj = {
    data: {
      message,
      userId,
      cinemaId,
      imagesId,
      bookId,
      storiesId,
      category
    }
  }
  switch (category) {
    case "book":
     commentObj.data.bookId = _id;
      break
    case "cinema":
     commentObj.data.cinemaId = _id;
      break
    case "images":
     commentObj.data.imagesId = _id;
      break
    case "stories":
     commentObj.data.storiesId = _id;
      break
  }

  db.comment.create(commentObj)
  .then(data => res.status(201).json(data))
  .catch(() => res.sendStatus(500));
}

export {postComment, getComments};