import express from 'express';
import { db } from '../../prisma/utils/db.server';

const images = express.Router();

images.post('/', (req, res) => {
  console.log('here is the body from the image post\n', req.body);

  res.sendStatus(200);
});


module.exports = images;
