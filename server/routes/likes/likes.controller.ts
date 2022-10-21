import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

const postLike = (req: Request, res: Response) => {
  const { type } = req.params;
  const { userId, horrorId, isLiked} = req.body;

  //check if user has already liked horrorId
  switch (type) {
    case "book":
      db.likes.findMany({
        where: {
          userId: userId,
          bookId: horrorId,
        }
      })
      .then((result:any) => {
        if(result.length) {
          res.send('User has already like this!');
        } else {
          const rateObj = {
            data: {
              userId,
              isLiked,
              cinemaId: null,
              imagesId: null,
              hauntId: null,
              bookId: horrorId,
              storyId: null
            }
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
      })
      .catch((err:Error) => {
        console.log(err);
        res.status(500).send(err);
      });
      break
    case "cinema":
      db.likes.findMany({
        where: {
          userId: userId,
          cinemaId: horrorId,
        }
      })
      .then((result:any) => {
        if(result.length) {
          res.send('User has already like this!');
        } else {
          const rateObj = {
            data: {
              userId,
              isLiked,
              cinemaId: horrorId,
              imagesId: null,
              hauntId: null,
              bookId: null,
              storyId: null
            }
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
      })
      .catch((err:Error) => {
        console.log(err);
        res.status(500).send(err);
      });
      break
    case "images":
      db.likes.findMany({
        where: {
          userId: userId,
          imagesId: horrorId,
        }
      })
      .then((result:any) => {
        if(result.length) {
          res.send('User has already like this!');
        } else {
          const rateObj = {
            data: {
              userId,
              isLiked,
              cinemaId: null,
              imagesId: horrorId,
              hauntId: null,
              bookId: null,
              storyId: null
            }
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
      })
      .catch((err:Error) => {
        console.log(err);
        res.status(500).send(err);
      });
      break
    case "stories":
      db.likes.findMany({
        where: {
          userId: userId,
          storyId: horrorId,
        }
      })
      .then((result:any) => {
        console.log(result);
        if(result.length) {
          res.send('User has already like this!');
        } else {
          const rateObj = {
            data: {
              userId,
              isLiked,
              cinemaId: null,
              imagesId: null,
              hauntId: null,
              bookId: null,
              storyId: horrorId
            }
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
      })
      .catch((err:Error) => {
        console.log(err);
        res.status(500).send(err);
      });
      break
    case "haunts":
      db.likes.findMany({
        where: {
          userId: userId,
          hauntId: horrorId,
        }
      })
      .then((result:any) => {
        if(result.length) {
          res.send('User has already like this!');
        } else {
          const rateObj = {
            data: {
              userId,
              isLiked,
              cinemaId: null,
              imagesId: null,
              hauntId: horrorId,
              bookId: null,
              storyId: null
            }
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
      })
      .catch((err:Error) => {
        console.log(err);
        res.status(500).send(err);
      });
      break
  }
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

  db.likes.delete({
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