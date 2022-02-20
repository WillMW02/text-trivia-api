const psk = process.env.HACKY_PSK;

export const validatePSK = async (req, res, next) => {
	const pskHeader = req.header('psk');

	if (psk != pskHeader) {
		return res.status(403).json({ status: 403, message: 'Bad pre-shared key' });
	}

	next();
};
