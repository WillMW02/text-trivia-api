import { Router } from 'express';
import UserRouter from './user.route.js';
import LoginRouter from './login.route.js';
import ScoreRouter from './score.route.js';
import QuestionRouter from './question.route.js';
import app from '../app.js';

const router = Router();

app.use('/user/', UserRouter);
app.use('/login/', LoginRouter);
app.use('/score/', ScoreRouter);
app.use('/question/', QuestionRouter);

export default router;
