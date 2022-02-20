const stopStr = process.env.STOP_STRING;
const frontend = process.env.FRONTEND_URL;

export const getResponseHandler = (questionHost) => {
	return (req, res) => {
		const number = req.body.number;
		const messageResponse = req.body.response.toLowerCase();

		if (messageResponse == stopStr) {
			if (questionHost.endCommunications(number)) {
				res.json({ message: `Thank you for participating! Visit ${frontend} if you wish to sign up again!` });
			} else {
				res.json({ message: `Visit ${frontend} to sign up to TextTrivia` });
			}
		} else {
			const successState = questionHost.check(number, messageResponse);
			switch (successState) {
			case 1:
				res.json({ message: 'Congratulations!' });
				break;
			case 0:
				res.json({ message: 'Incorrect answer!' });
				break;
			case -1:
				res.json({ message: `You have already answered this question! If you wish to stop receiving messages, type "${stopStr}"` });
				break;
			case -2:
				res.json({ message: `Today's question is not available yet! If you wish to stop receiving messages, type "${stopStr}"` });
				break;
			default:
				// TODO laziness means I just copied this line from above
				res.json({ message: `Visit ${frontend} to sign up to TextTrivia` });
				break;
			}
		}
	};
};
