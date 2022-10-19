import express from 'express';

import { getAllStories, addStory, editStory } from './stories.controller';

const StoryRouter = express.Router();

StoryRouter.get('/allStories', getAllStories);

StoryRouter.post('/addStory', addStory);

StoryRouter.patch('/editStory', editStory);

export default StoryRouter;