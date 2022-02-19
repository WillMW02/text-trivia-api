import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { csrfProtection } from '../middleware/auth.middleware.js';
// import cookieParser from 'cookie-parser';

const router = Router();

router.post('/login', csrfProtection, AuthController.login);

router.post('/logout', csrfProtection, AuthController.logout);

export default router;
