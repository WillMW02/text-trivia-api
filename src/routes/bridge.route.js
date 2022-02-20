import { Router } from 'express';
import * as BridgeController from '../controllers/bridge.controller.js';
import QuestionHost from '../lib/questionHost.js';
import { validatePSK } from '../middleware/psk.middleware.js';

const router = Router();

// note to self - do not add CSRF, this should be authenticated internally and without JWT.
// ! TODO - psk auth
// the other troubled one
router.post('/response', validatePSK, BridgeController.getResponseHandler()));

export default router;
