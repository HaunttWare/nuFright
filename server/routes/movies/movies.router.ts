import express from 'express';
import { getHorrorMovies, getMoviesFromAPI, likeAMovie, unLikeMovie } from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/', getHorrorMovies);
MovieRouter.get('/api', getMoviesFromAPI);
MovieRouter.post('/like', likeAMovie);
MovieRouter.delete('/unlike/', unLikeMovie);
//unLikeMovie // put back in import
export default MovieRouter;