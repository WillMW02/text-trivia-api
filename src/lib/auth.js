import { hash, compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import logger from '../lib/logger.js';

export const generateJWT = async (id, expiresIn = '2h') => {
	logger.info(`generateJWT invoked for ${id}`);
	const jwt = jsonwebtoken.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn,
	});
	return jwt;
};
  
export const verifyJWT = async jwt => {
	return await new Promise((resolve) => {
		jsonwebtoken.verify(jwt, process.env.TOKEN_SECRET, (err, user) => {
			resolve({ err, user });
		});
	});
};

export const hashPassword = async (password) => hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
export const verifyPassword = async (password, hashed_password) => compare(password, hashed_password);
