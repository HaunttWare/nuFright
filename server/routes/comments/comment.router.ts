import express from 'express';
import { postComment } from './comment.controller';

const commentRouter = express.Router();

commentRouter.post('/', postComment);

export default commentRouter;