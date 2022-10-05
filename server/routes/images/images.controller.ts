const prisma = require('../client.ts');
import express from 'express';

const images = express.Router();

images.post('/', (req, res) => {
  console.log('here is the body from the image post\n', req.body);

  //
});


module.exports = images;
