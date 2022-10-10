import express from 'express';

import { getAllStories, getName, addStory } from './stories.controller';

const StoryRouter = express.Router();

StoryRouter.get('/allStories', getAllStories);
StoryRouter.get('/user/:userId', getName);

StoryRouter.post('/addStory', addStory);

export default StoryRouter;