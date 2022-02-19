import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
// import cookieParser from 'cookie-parser';

const router = Router();

const csrfProtection = csurf({ cookie: true });
router.use(cookieParser());
router.post('/login', csrfProtection, AuthController.login)

export default router;
