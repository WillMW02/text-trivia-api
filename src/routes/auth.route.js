import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import * as AuthMiddleware from '../middleware/auth.middleware.js';
// import cookieParser from 'cookie-parser';

const router = Router();

router.post('/login', AuthMiddleware.csrfProtection, AuthController.login);

router.post('/logout', AuthMiddleware.csrfProtection, AuthController.logout);

export default router;
