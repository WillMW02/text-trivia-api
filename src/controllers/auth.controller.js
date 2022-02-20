import * as PgSQL from '../lib/pgsql.js';
import sqlCommands from '../config/sqlCommands.json';
import logger from '../lib/logger.js';
import * as Auth from '../lib/auth.js'; 

export const login = async (req, res, next) => {
	if(!(req.body && req.body.username && req.body.password)) {
		res.status(406);
		return res.json({
			err: 'Request body did not include required parameters'
		});
	}
	const username = req.body.username;
	const pass = req.body.password;
	let client;
	let userProfile = undefined;
	try {
		client = await PgSQL.connect();
		const res = await client.query(
			sqlCommands.users.getPassword, [username]
		);
		userProfile = res.rows ? res.rows[0] : undefined;
	} catch(err) {
		logger.error(err, true);
		throw new Error('An error occurred whilst getting user password');
	} finally {
		if(client) client.release();
	}

	if (userProfile) {
		logger.info(`pass: ${pass}, userprofilePass: ${userProfile.password}`);
		if (await Auth.verifyPassword(pass, userProfile.password)) {
			// If valid credentials, set cookie
			res.cookie(
				'jwt',
				Auth.generateJWT(username),
				{
					httpOnly: true,
				}
			);
			res.sendStatus(200);
		} else {
			res.status(403);
			res.send();
		}
	} else {
		res.status(404);
		res.send();
	}
};

export const logout = (req, res, next) => {
	res.clearCookie('jwt');
	res.sendStatus(200);
};
