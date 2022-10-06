import express, { Request, Response } from "express";
const path = require('path');
const images = require('./routes/images/images.controller.ts');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'public')));
app.use(express.json());

app.use('/images', images);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
})