import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.post("/", UserController.getUser)

router.get("/:id", UserController.getUsers)

export default router;
