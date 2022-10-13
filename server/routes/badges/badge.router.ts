import express from 'express';
import { postBadge } from './badge.controller';

const badgeRouter = express.Router();

badgeRouter.post('/', postBadge);


export default badgeRouter;