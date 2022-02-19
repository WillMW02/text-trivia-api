import { Router } from 'express';
import UserRouter from './user.route.js';
import LoginRouter from './login.route.js';
import ScoreRouter from './score.route.js';
import QuestionRouter from './question.route.js';
import app from '../app.js';

const router = Router();

router.use('/user/', UserRouter);
router.use('/login/', LoginRouter);
router.use('/score/', ScoreRouter);
router.use('/question/', QuestionRouter);

export default router;
