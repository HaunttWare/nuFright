import express from 'express';
import { addToPlaylist, getVideos, getUserPlaylist } from './playlists.controller';

const PlaylistRouter = express.Router();

PlaylistRouter.get('/search/:query', getVideos);
PlaylistRouter.post('/add', addToPlaylist);
PlaylistRouter.get('/get/:userId', getUserPlaylist);

export default PlaylistRouter;