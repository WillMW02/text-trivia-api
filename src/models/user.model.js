import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';

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

export const setNumber = async (id, mobile_no) => {
	let client;
	try {
		client = await PgSQL.connect();
		await client.query(sqlCommands.users.changeNumber, [mobile_no, id]);
	} catch(err) {
		logger.error(err);
		throw new Error('An error occurred whilst changing a user contact number');
	} finally {
		if(client) client.release();
	}
};

export const getPassword = async (username) => {
	let client;
	try {
		client = await PgSQL.connect();
		const res = await client.query(
			sqlCommands.users.getPassword, [username]
		);
		if(res.rows) return res.rows[0];
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst getting user password');
	} finally {
		if(client) client.release();
	}
}
