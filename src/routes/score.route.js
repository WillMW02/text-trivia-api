import { Router } from 'express';
import * as ScoreController from '../controllers/score.controller.js';

const router = Router();

router.get('/', ScoreController.getScores);

router.get('/me', ScoreController.getOwnScore);

router.get('/:id', ScoreController.getScore);

export default router;
