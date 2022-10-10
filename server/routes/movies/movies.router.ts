import express from 'express';
import { getHorrorMovies, getMoviesFromAPI, likeAMovie} from './movies.controller';

const MovieRouter = express.Router();

// example 
MovieRouter.get('/', getHorrorMovies);
MovieRouter.get('/api', getMoviesFromAPI);
MovieRouter.post('/like', likeAMovie);
// MovieRouter.delete('/unlike/:cinemaId', unLikeMovie);
//unLikeMovie // put back in import
export default MovieRouter;