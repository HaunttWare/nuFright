import express, { Request, Response } from "express";
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'build')));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is totally running at http://localhost:${PORT}`);
})