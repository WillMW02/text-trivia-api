import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ApiRouter from './routes/api.route.js';
import logger from './lib/logger.js';
import { csrfHandler, csrfProtection } from './middleware/auth.middleware.js';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	logger.info(`${req.method} request to ${req.path} from ${req.ip}`, true);
	res.setHeader('X-Powered-By', 'Magic and Pixie Dust');
	next();
});

app.use('/v1/', ApiRouter);

app.get('/csrf', csrfProtection, (req, res) => {
	res.cookie('XSRF-TOKEN', req.csrfToken());
	res.sendStatus(200);
});

app.use(csrfHandler);

export default app;
