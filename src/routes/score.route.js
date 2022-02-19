import { Router } from 'express';
import * as ScoreController from '../controllers/score.controller.js';

const router = Router();

router.get('/', ScoreController.getScores);

// ? maybe a /me endpoint (using JWT) would be useful here too?
router.get('/:id', ScoreController.getScore);

export default router;
