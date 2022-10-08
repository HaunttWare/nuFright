import express from 'express';
import { getHorrorMovies, getMoviesFromAPI } from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/movies', getHorrorMovies);
MovieRouter.get('/api', getMoviesFromAPI);

export default MovieRouter;