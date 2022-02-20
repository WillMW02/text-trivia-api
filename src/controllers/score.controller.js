import * as ScoreModel from '../models/score.model.js';

export const getScores = async (req, res, next) => {

	try {
		const scores = await ScoreModel.getMultiple();
		if(scores) return res.json(scores);
		res.status(404);
		res.send();
	} catch(e) {
		res.status(500);
		res.send();
		next(e);
		return;
	}

};

export const getOwnScore = async (req, res, next) => {
	const id = req.user.id;

	try {
		if(id) {
			const dat = await ScoreModel.get(id);
			if(dat) return res.json(dat);
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

export const getScore = async (req, res, next) => {
	let id = req.params.id;

	try {
		const score = await ScoreModel.get(id);
		if(score) return res.json(score);
		res.status(404);
		res.send();
	} catch (e) {
		res.status(500);
		res.send();
		next(e);
		return;
	}

};
