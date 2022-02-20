import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';


export const get = async (id) => {
	let client;
	try {
		client = await PgSQL.connect();
		const res = await client.query(sqlCommands.scores.getScore, [id]);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching user scores');
	} finally {
		if(client) client.release();
	}
};

export const getMultiple = async (offset = 0, limit = 100) => {
	let client;
	try {
		client = await PgSQL.connect();
		const res = await client.query(sqlCommands.scores.getScores, [limit, offset]);
		return res.rows;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching user scores');
	} finally {
		if(client) client.release();
	}
};
