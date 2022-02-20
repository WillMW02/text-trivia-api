import './config/env.config.js';
import server from './app.js';
import logger from './lib/logger.js';

server.listen(process.env.PORT??8080, () => {
	logger.info(`Listening on port ${process.env.PORT??8080}`);
});
