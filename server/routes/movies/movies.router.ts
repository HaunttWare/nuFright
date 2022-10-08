import express from 'express';
import { getHorrorMovies } from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/movies', getHorrorMovies);

export default MovieRouter;