import express from 'express';
import { postComment } from './comment.controller';

const commentRouter = express.Router();

commentRouter.post('/:type', postComment);

export default commentRouter;