import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';

export const get = async (id = null) => {
	let client;
	try {
		client = await PgSQL.connect();
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

export const publish = async (id) => {
	let client;
	try {
		client = await PgSQL.connect();
		await client.query(sqlCommands.questions.publishQuestion, [id]);
		return true;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst publishing a question');
	} finally {
		if(client) client.release();
	}
};
