import express from 'express';
import { uploadImage, upload, getImages, getUserImgs, getUserNames } from './images.controller';

const imageRouter = express.Router();

imageRouter.post('/upload', upload.single('image'), uploadImage);
imageRouter.get('/', getImages);
imageRouter.get('/myImages/:userId', getUserImgs);
imageRouter.get('/names', getUserNames);



export default imageRouter;