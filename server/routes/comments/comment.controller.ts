import {Request, Response} from 'express';
import {db} from '../../prisma/utils/db.server';

const getComments = (req: Request, res: Response) => {
  db.comment.findMany({})
  .then(results => res.status(200).json(results))
  .catch(() => res.sendStatus(500));
}

const getCommentUserName = (req: Request, res: Response) => {
    db.user.findMany({})
    .then(results => res.status(200).json(results))
    .catch(() => res.sendStatus(500));
}

const postComment = (req: Request, res: Response) => {
  const {body: {userId, message, categoryId, type}, params: {_id}} = req;
 
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

  switch (type) {
    case "book":
     commentObj.data.bookId = categoryId;
      break
    case "cinema":
     commentObj.data.cinemaId = categoryId;
      break
    case "images":
     commentObj.data.imagesId = categoryId;
      break
    case "stories":
     commentObj.data.storiesId = categoryId;
      break
  }

  db.comment.create(commentObj)
  .then(data => res.status(201).json(data.id))
  .catch(() => res.sendStatus(500));
}

const deleteComment = (req: Request, res: Response) => {
  const {params: {_id}} = req;
  db.comment.delete({where: {id: _id}})
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500))
}

const updateComment = (req: Request, res: Response) => {
  const {params: {_id}, body: {message}} = req;

  db.comment.update({where: {id:_id}, data: {message}})
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500))
}

export {postComment, getComments, getCommentUserName, deleteComment, updateComment};