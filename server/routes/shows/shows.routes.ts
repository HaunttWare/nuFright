import express from 'express';
import { getHorrorShows, likeShow, saveShow } from './shows.controller';

const ShowsRouter = express.Router();

ShowsRouter.get('/', getHorrorShows);

//ShowsRouter.get('/show-api', getShowsFromAPI); don't forget import

ShowsRouter.post('/:cinemaId/like', likeShow);
ShowsRouter.post('/:cinemaId/save', saveShow);

export default ShowsRouter;