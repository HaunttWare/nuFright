import express from 'express';
import { addToPlaylist, getVideos } from './playlists.controller';

const PlaylistRouter = express.Router();

PlaylistRouter.get('/search/:query', getVideos);
PlaylistRouter.post('/add', addToPlaylist);

export default PlaylistRouter;