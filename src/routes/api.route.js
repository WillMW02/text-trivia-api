import { Router } from 'express';
import UserRouter from './user.route.js';
import LoginRouter from './login.route.js';
import app from '../app.js';

const router = Router();

app.use('/user/', UserRouter);
app.use('/login/', LoginRouter);

export default router;