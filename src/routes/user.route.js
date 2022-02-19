import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.post('/', UserController.getUsers);

router.get('/:id', UserController.getUser);

export default router;
