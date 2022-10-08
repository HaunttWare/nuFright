import express from 'express';

import { getAllStories, addStory } from './stories.controller';

const StoryRouter = express.Router();

StoryRouter.get('/allStories', getAllStories);

StoryRouter.post('/addStory', addStory);

export default StoryRouter;