import * as ScoreModel from '../models/score.model.js';

export const getScores = async (req, res, next) => {

	try {
		const scores = await ScoreModel.getMultiple();
		if(scores) res.json(scores);
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
	
}

export const getScore = async (req, res, next) => {

	let id = req.params.id;
	if (id == 'me') {
		//TODO: Add code to get the current user ID
	}

	try {
		const score = await ScoreModel.get(id);
		if(score) res.json(score);
		res.status(404);
		res.send();
	} catch (e) {
		res.status(500);
		res.send();
		next(e);
		return;
	}

};
