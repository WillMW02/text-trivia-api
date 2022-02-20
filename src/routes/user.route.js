import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { authenticateToken, csrfProtection } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateToken, UserController.getOwnUser);

// ? TODO: this feature might be useful later
//router.get('/:id', UserController.getUser);

router.post('/create', UserController.createUser);

router.post('/set-phone', authenticateToken, UserController.setUserPhone);

export default router;
