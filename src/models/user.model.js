import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';
import { hash } from 'bcrypt';

export const get = async (id = null) => {
	let client;
	try {
		client = await PgSQL.connect();
		const res = await client.query(sqlCommands.users.getUser, [id]);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst fetching a user');
	} finally {
		if(client) client.release();
	}
};

export const create = async (username, pass_hash, mobile_no) => {
	let client;
	try {
		client = await PgSQL.connect();
		const res = await client.query(sqlCommands.users.createUser, [username, pass_hash, mobile_no]);
		return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst creating a user');
	} finally {
		if(client) client.release();
	}
};

const hashPassword = async (password) => hash(password, process.env.BCRYPT_SALT_ROUNDS);
