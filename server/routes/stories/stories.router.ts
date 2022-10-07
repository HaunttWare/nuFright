import express from 'express';

import { getAllStories } from './stories.controller';

const StoryRouter = express.Router();

StoryRouter.get('/allStories', getAllStories);

export default StoryRouter;