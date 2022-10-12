import express from 'express';

import { getAllStories, getName, addStory, editStory } from './stories.controller';

const StoryRouter = express.Router();

StoryRouter.get('/allStories', getAllStories);
StoryRouter.get('/user/:userId', getName);

StoryRouter.post('/addStory', addStory);

StoryRouter.patch('/editStory', editStory);

export default StoryRouter;