const stopStr = process.env.STOP_STRING;
const frontend = process.env.FRONTEND_URL;

import QuestionHost from "../lib/questionHost.js";

const questionHost = new QuestionHost();

export const getResponseHandler = () => {
	return async (req, res) => {
		const number = req.body.number;
		const messageResponse = req.body.response.toLowerCase();

		if (messageResponse == stopStr) {
			if (await questionHost.endCommunications(number)) {
				return res.json({ message: `Thank you for participating! Visit ${frontend} if you wish to sign up again!` });
			} else {
				return res.json({ message: `Visit ${frontend} to sign up to TextTrivia` });
			}
		} else {
			const successState = await questionHost.check(number, messageResponse);
			switch (successState) {
			case 1:
				return res.json({ message: 'Congratulations!' });
			case 0:
				return res.json({ message: 'Incorrect answer!' });
			case -1:
				return res.json({ message: `You have already answered this question! If you wish to stop receiving messages, type "${stopStr}"` });
			case -2:
				return res.json({ message: `Today's question is not available yet! If you wish to stop receiving messages, type "${stopStr}"` });
			default:
				// TODO laziness means I just copied this line from above
				return res.json({ message: `Visit ${frontend} to sign up to TextTrivia` });
			}
		}
	};
};