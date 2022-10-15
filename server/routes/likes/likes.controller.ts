import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

const postLike = (req: Request, res: Response) => {
  const { type } = req.params;
  const { userId, horrorId, isLiked} = req.body;

  const rateObj = {
    data: {
      userId,
      isLiked,
      cinemaId: null,
      imagesId: null,
      hauntsId: null,
      bookId: null,
      storiesId: null
    }
  }
  switch (type) {
    case "book":
      rateObj.data.bookId = horrorId
      break
    case "cinema":
      rateObj.data.cinemaId = horrorId
      break
    case "images":
      rateObj.data.imagesId = horrorId
      break
    case "stories":
      rateObj.data.storiesId = horrorId
      break
    case "haunts":
      rateObj.data.hauntsId = horrorId
      break
  }

  db.likes.create(rateObj)
  .then((data) => {
    console.log('Liking works', data);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error('error creating likes\n', err);
    res.sendStatus(500);
  })
  

}

const updateLike = (req: Request, res: Response) => {
  const { likeId, isLiked } = req.body;

  db.likes.update({
    where: {
      id: likeId
    },
    data: {
      isLiked
    }
  })
  .then((data) => {
    console.log('updated rating', data);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error('error on updating rating\n', err);
    res.sendStatus(500);
  })
  
}



const deleteLike = (req: Request, res: Response) => {
  const { likeId } = req.params

  db.booScale.delete({
    where: {
      id: likeId
    },
  })
  .then((data) => {
    console.log('deleted rating', data);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error('error deleting rating \n', err);
    res.sendStatus(500);
  })
}


export {
  deleteLike,
  postLike,
  updateLike
}