import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { csrfProtection } from '../middleware/auth.middleware.js';
// import cookieParser from 'cookie-parser';

const router = Router();

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

export default router;
