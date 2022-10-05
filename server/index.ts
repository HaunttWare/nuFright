<<<<<<< HEAD
import express, { application, Request, Response } from "express";
import passport from 'passport';
import cors from 'cors'
import './routes/auth/auth'
import authRouter from './routes/auth/auth.router'


=======
import express, { Request, Response } from "express";
>>>>>>> 1c8b44c0cf18abc51a45e5c1cf013b42e5954054
const path = require('path');

const app = express();

app.use(passport.initialize())
app.use(passport.session())
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'public')));
app.use(express.json());

app.use('/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
})