import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';



const getHorrorMovies = (req: Request, res: Response) => {
  db.cinema.findMany({})
    .then((moviesData) => {
      res.send(moviesData);
    }) 
    .catch((err) => {
      res.send(err)
    })
}


export {
  getHorrorMovies,
}