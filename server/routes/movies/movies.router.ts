import express from 'express';
import { getHorrorMovies, getMoviesFromAPI, likeMovie, saveMovie } from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/', getHorrorMovies);
MovieRouter.get('/movie-api', getMoviesFromAPI);

MovieRouter.post('/:cinemaId/like', likeMovie);
MovieRouter.post('/:cinemaId/save', saveMovie);

export default MovieRouter;