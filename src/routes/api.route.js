import { Router } from 'express';
import AuthRouter from './auth.route.js';
import ScoreRouter from './score.route.js';
import BridgeRouter from './bridge.route.js';
import UserRouter from './user.route.js';

const router = Router();

router.use('/auth/', AuthRouter);
router.use('/bridge/', BridgeRouter);
router.use('/score/', ScoreRouter);
router.use('/user/', UserRouter);

export default router;
