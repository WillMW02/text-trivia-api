import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';

export const get = async (id = null) => {
	const client = await PgSQL.connect();
	try {
		const res = await client.query(
			id?sqlCommands.questions.getQuestion:sqlCommands.questions.getLatestQuestion, 
			id?[id]:null
		);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst fetching a question');
	} finally {
		if(client) client.release();
	}
};
