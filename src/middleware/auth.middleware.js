import * as Auth from '../lib/auth.js';
import csurf from 'csurf';

export const authenticateToken = async (req, res, next) => {
	const jwt = req.cookies.jwt;
  
	if (jwt == null) {
		return res.status(401).json({ status: 401, message: 'No JWT cookie sent' });
	}
  
	const { err, user } = await Auth.verifyJWT(jwt);
  
	if (err) return res.status(401).json({ status: 401, message: 'Invalid JWT sent' });
	req.user = user;
  
	next();
};

export const csrfProtection = csurf({ cookie: true });

export const csrfHandler = (err, _req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') {
		return next(err);
	}
  
	return res.status(403).json({ status: 403, message: 'Invalid or missing CSRF token' });
};
