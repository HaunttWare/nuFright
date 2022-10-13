import express from 'express';
import { getHorrorShows, getShowsFromAPI, likeShow, saveShow } from './shows.controller';

const ShowsRouter = express.Router();

ShowsRouter.get('/', getHorrorShows);

ShowsRouter.get('/show-api', getShowsFromAPI);

ShowsRouter.post('/:cinemaId/like', likeShow);
ShowsRouter.post('/:cinemaId/save', saveShow);

export default ShowsRouter;