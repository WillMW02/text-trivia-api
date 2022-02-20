import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';


export const get = async (id) => {
	const client = await PgSQL.connect();
	try {
		const res = await client.query(sqlCommands.scores.getScore, [id]);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching user scores');
	} finally {
		if(client) client.release();
	}
};

export const getScores = async (offset = 0, limit = 100) => {
	const client = await PgSQL.connect();
	try {
		const res = await client.query(sqlCommands.scores.getScores, [limit, offset]);
		return res.rows;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occured whilst fetching user scores');
	} finally {
		if(client) client.release();
	}
};
