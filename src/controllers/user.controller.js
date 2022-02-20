import logger from '../lib/logger.js';
import { hashPassword } from '../lib/auth.js';
import * as UserModel from '../models/user.model.js';

export const getOwnUser = async (req, res, next) => {
	const id = req.user.id;
	try {
		if(id) {
			const dat = await UserModel.get(id);
			if(dat) res.json(dat);
		}
		res.status(404);
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

export const createUser = async (req, res, next) => {
	if(!(req.body && req.body.username && req.body.password && req.body.mobile_no)) {
		res.status(406);
		if(!(req.body.mobile_no && /^([+]\d{2})?\d{10}$/.test(req.body.mobile_no.replace(/\s/g, '')))) return res.json({
			err: 'Request body did not include a valid phone number'
		}); 
		return res.json({
			err: 'Request body did not include required parameters'
		});
	}

	try {
		const pass_hash = await hashPassword(req.body.password);

		await UserModel.create(req.body.username, pass_hash, req.body.mobile_no);
		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};

export const setUserPhone = async(req, res, next) => {
	if(!(req.body && req.body.mobile_no && /^([+]\d{2})?\d{10}$/.test(req.body.mobile_no.replace(/\s/g, '')))) {
		res.status(406);
		return res.json({
			err: 'Request body did not include a valid phone number'
		}); 
	}

	if(!req.user.id) {
		res.status(404);
		res.send();
	}

	try {
		await UserModel.setNumber(req.user.id, req.body.mobile_no);

		res.send();
	} catch(err) {
		res.status(500);
		res.send();
		next(err);
		return;
	}
};
