import fetch from 'node-fetch';
import logger from '../lib/logger.js';

const bridgeUrl = process.env.BRIDGE_SOURCE_URL;
const psk = process.env.HACKY_PSK;

export async function sendTwilioMessage(message, to) {
	logger.info(JSON.stringify({ message, to }), true);
	logger.info(`${bridgeUrl}send`);
	const response = await fetch(`${bridgeUrl}send`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'psk': psk
		},
		body: JSON.stringify({ message, to }),
	});

	const responseData = await response.json();
	return responseData ? responseData.success : false;
}
