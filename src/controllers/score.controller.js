import * as ScoreModel from '../models/score.models.js';

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

export const getScore = (req, res, next) => {
	id = req.params.id;
	const score = ScoreModel.get(id);
};
