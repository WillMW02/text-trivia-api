import { Router } from 'express';
import AuthRouter from './auth.route.js';
import QuestionRouter from './question.route.js';
import ScoreRouter from './score.route.js';
import TwilioRouter from './twilio.route.js';
import UserRouter from './user.route.js';

const router = Router();

router.use('/auth/', AuthRouter);
router.use('/question/', QuestionRouter);
router.use('/score/', ScoreRouter);
router.use('/twilio/', TwilioRouter);
router.use('/user/', UserRouter);

export default router;
