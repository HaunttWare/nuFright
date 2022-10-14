import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

const postRating = (req: Request, res: Response) => {
  const { type } = req.params;
  const { userId, horrorId, rating} = req.body;

  const rateObj = {
    data: {
      userId,
      rating,
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

  db.booScale.create(rateObj)
  .then((data) => {
    console.log('it WOOORRRKKKSSSSS', data);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error('error on, it dont work :(\n', err);
    res.sendStatus(500);
  })
  

}

const updateRating = (req: Request, res: Response) => {
  const { ratingId, rating } = req.body;

  db.booScale.update({
    where: {
      id: ratingId
    },
    data: {
      rating,
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



const deleteRating = (req: Request, res: Response) => {
  const { ratingId } = req.params

  db.booScale.delete({
    where: {
      id: ratingId
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
  deleteRating,
  postRating,
  updateRating
}