import express from 'express';
import {getUserLikedBooks} from './user.controller';

const userRouter = express.Router();

userRouter.get('/:id/liked-books', getUserLikedBooks);

export default userRouter;