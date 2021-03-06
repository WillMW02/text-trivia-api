import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import ApiRouter from './routes/api.route.js';
import logger from './lib/logger.js';
import { csrfHandler, csrfProtection } from './middleware/auth.middleware.js';
import QuestionHost from './lib/questionHost.js';

const app = express();
const __dirname = fileURLToPath(dirname(import.meta.url));

app.use(express.static(join(__dirname, './_public')));

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

const questionHost = new QuestionHost();
global.questionHost = questionHost;
questionHost.scheduleCron();

app.get('/invoke', (req, res, next) => {
	questionHost.triggerNow(true);
});

app.get('/questionforce', (req,res,next) => {
	questionHost.loadQuestion();
});
// the troubled one
QuestionHost.instance = questionHost;

export default app;
