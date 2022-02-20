import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { authenticateToken, csrfProtection } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateToken, UserController.getOwnUser);

// ? TODO: this feature might be useful later
//router.get('/:id', UserController.getUser);

router.post('/create', csrfProtection, UserController.createUser);

router.post('/set-phone', csrfProtection, authenticateToken, UserController.setUserPhone);

export default router;
