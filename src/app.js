import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ApiRouter from './routes/api.route.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	logger.info(`${req.method} request to ${req.path} from ${req.ip}`, true);
	res.setHeader('X-Powered-By', 'Magic and Pixie Dust');
	next();
});

app.use('/api/', ApiRouter);

export default app;
