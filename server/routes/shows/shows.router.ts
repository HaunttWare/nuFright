import express from 'express';
import { getHorrorShows, getShowsFromAPI } from './shows.controller';

const ShowsRouter = express.Router();

ShowsRouter.get('/', getHorrorShows);
ShowsRouter.get('/api', getShowsFromAPI);

export default ShowsRouter;