import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

// TODO add JWT middleware
router.get('/me', UserController.getOwnUser);

// ? TODO: this feature might be useful later
router.get('/:id', UserController.getUser);

// TODO add JWT & CSRF middleware
router.post('/create', UserController.createUser);

// TODO add JWT & CSRF middleware
router.post('/set-phone', UserController.setUserPhone);

export default router;
