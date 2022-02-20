import * as PgSQL from '../lib/pgsql';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger';
import { hash } from 'bcrypt';

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

const hashPassword = async (password) => {
	return await hash(password, process.env.BCRYPT_SALT_ROUNDS);
};
