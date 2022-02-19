import * as Auth from '../lib/auth.js'; 

export const login = (req, res, next) => {
	const username = req.body.username;
	const pass = req.body.password;

	// TODO: Add credential verification

	// If valid credentials, set cookie
	res.cookie(
		'jwt',
		Auth.generateJWT(username),
		{
			httpOnly: true,
		}
	);
	res.sendStatus(200);
};

export const logout = (req, res, next) => {
	res.clearCookie('jwt');
	res.sendStatus(200);
};
