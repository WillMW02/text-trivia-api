import { Router } from 'express';
import * as BridgeController from '../controllers/bridge.controller.js';
import QuestionHost from '../lib/questionHost.js';

const router = Router();

// note to self - do not add CSRF, this should be authenticated internally and without JWT.
// ! TODO - psk auth
// the other troubled one
router.post('/response', BridgeController.getResponseHandler(QuestionHost.instance));

export default router;
