import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import { forEachChild } from 'typescript';
import axios from 'axios';

let type = 'movie';


const getMoviesFromAPI = (req: Request, res: Response) => {
  let urls = [
    `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=1`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=2`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=3`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${config.MOVIEDB_API_KEY}&with_genres=27&page=4`
  ]

  const apiReq = urls.map((url) => {
    return axios.get(url)
    
  })
  return Promise.all(apiReq)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
  

};

const getHorrorMovies = (req: Request, res: Response) => {
  db.cinema.findMany({})
    .then((moviesData) => {
      res.status(200).send(moviesData);
    }) 
    .catch((err) => {
      console.error('error in getHorrorMovies, in controller', err);
      res.sendStatus(500);
    })
}


export {
  getHorrorMovies,
  getMoviesFromAPI,
}