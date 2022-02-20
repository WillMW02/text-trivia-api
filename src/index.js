import './config/env.config.js';
import server from './app.js';
import logger from './lib/logger.js';
import QuestionHost from './lib/questionHost.js';

server.listen(process.env.PORT??8080, () => {
	logger.info(`Listening on port ${process.env.PORT??8080}`);
});

const questionHost = new QuestionHost();
questionHost.scheduleCron();
// the troubled one
QuestionHost.instance = questionHost;
