import * as Auth from '../lib/auth.js';
import csurf from 'csurf';

export const authenticateToken = async (req, res, next) => {
	const jwt = req.cookies.jwt;
  
	if (jwt == null) {
		return res.status(401).json({ status: 401, message: 'No JWT cookie sent' });
	}
  
	const { err, user } = await Auth.verifyJWT(jwt);
	
	console.log()

	if (err) return res.status(401).json({ status: 401, message: 'Invalid JWT sent' });
	req.user = user;
  
	next();
};

export const csrfProtection = csurf({ cookie: true });

export const csrfHandler = (err, _req, res, next) => {
	// !!! ouch - cannot access cookie clientside if current origin =/= api origin
	// ? return the token to be sent via header through /csrf and then store in local storage?
	next();

	// if (err.code !== 'EBADCSRFTOKEN') {
	// 	return next(err);
	// }
  
	// return res.status(403).json({ status: 403, message: 'Invalid or missing CSRF token' });
};
