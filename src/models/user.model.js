import * as PgSQL from '../lib/pgsql';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger';

export const get = async (id = null) => {
	const client = await PgSQL.connect();
	try {
		const res = await client.query(sqlCommands.users.getUser, [id]);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst fetching a user');
	} finally {
		if(client) client.release();
	}
};

import { hash } from 'bcrypt';

const salt_rounds = 10;

const hashPassword = async (password) => {
	return await hash(password, salt_rounds);
}