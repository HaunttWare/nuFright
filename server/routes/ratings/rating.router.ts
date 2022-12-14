import express from 'express';
import { postRating, updateRating, deleteRating } from './rating.controller';

const ratingRouter = express.Router();

ratingRouter.post('/:type', postRating);
// ratingRouter.put('/', updateRating);
ratingRouter.delete('/', deleteRating);


export default ratingRouter;