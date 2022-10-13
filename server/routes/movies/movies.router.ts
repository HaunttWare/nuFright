import express from 'express';
import { getHorrorMovies, likeAMovie, unLikeMovie } from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/', getHorrorMovies);
//MovieRouter.get('/movie-api', getMoviesFromAPI); // don't forget import 
MovieRouter.post('/like', likeAMovie);
MovieRouter.delete('/unlike/', unLikeMovie);
//unLikeMovie // put back in import
export default MovieRouter;