import express, { application, Request, Response } from "express";
import passport from 'passport';
import cors from 'cors'
import './routes/auth/auth'
import authRouter from './routes/auth/auth.router'



const path = require('path');
const images = require('./routes/images/images.controller.ts');

const app = express();

app.use(passport.initialize())
app.use(passport.session())
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'public')));
app.use(express.json());

app.use('/auth', authRouter)
app.use('/images', images);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
})