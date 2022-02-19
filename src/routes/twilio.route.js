import { Router } from 'express';
import * as TwilioController from '../controllers/twilio.controller.js';

const router = Router();

// note to self - do not add CSRF, this should be authenticated internally and without JWT.
router.post('/response', TwilioController.handleResponse);

export default router;
