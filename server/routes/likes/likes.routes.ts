import express from 'express';
import { postLike, updateLike, deleteLike } from './likes.controller';

const likesRouter = express.Router();

likesRouter.post('/:type', postLike);
likesRouter.put('/', updateLike);
likesRouter.delete('/:likeId', deleteLike);


export default likesRouter;