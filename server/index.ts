import express, { Request, Response, NextFunction } from "express";

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send('yoooo') 
  } catch (error) {
    next(error);
  }
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is totally running at http://localhost:${PORT}`);
})