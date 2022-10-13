import express from 'express';
import { getHorrorShows } from './shows.controller';

const ShowsRouter = express.Router();

ShowsRouter.get('/', getHorrorShows);

//ShowsRouter.get('/show-api', getShowsFromAPI); don't forget import

export default ShowsRouter;