import { Router } from 'express';
import * as BridgeController from '../controllers/bridge.controller.js';

const router = Router();

// note to self - do not add CSRF, this should be authenticated internally and without JWT.
router.post('/response', BridgeController.handleResponse);

export default router;
