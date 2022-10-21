import express from "express";
import { postBlob, upload, getBlobs } from "./songs.controller";


const SongsRouter = express.Router();

SongsRouter.post('/savesong', upload.single('song'), postBlob);
SongsRouter.get('/getsongs', getBlobs);


export default SongsRouter;