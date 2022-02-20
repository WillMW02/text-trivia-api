import logger from '../lib/logger.js';
import * as UserModel from '../models/user.model.js';

export const getOwnUser = async (req, res, next) => {
	const id = req.user.id;
	try {
		if(!id) throw new Error('No user ID could be found');
		const dat = await UserModel.get(id);
		if(dat) res.json(dat);
		res.status(404);
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

export const createUser = (req, res, next) => {

};

export const setUserPhone = (req, res, next) => {
	
};
