import { Router } from 'express';
import UserRouter from './user.route.js';
import AuthRouter from './auth.route.js';
import ScoreRouter from './score.route.js';
import QuestionRouter from './question.route.js';

const router = Router();

router.use('/user/', UserRouter);
router.use('/auth/', AuthRouter);
router.use('/score/', ScoreRouter);
router.use('/question/', QuestionRouter);

export default router;
