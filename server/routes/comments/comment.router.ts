import express from 'express';
import { postComment, getComments, getCommentUserName, deleteComment, updateComment } from './comment.controller';

const commentRouter = express.Router();

commentRouter.get('/', getComments);
commentRouter.get('/users', getCommentUserName);
commentRouter.post('/:_id', postComment);
commentRouter.delete('/:_id', deleteComment);
commentRouter.put('/:_id', updateComment);



export default commentRouter;