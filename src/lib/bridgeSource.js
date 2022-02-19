import fetch from 'node-fetch';

const bridgeUrl = process.env.BRIDGE_SOURCE_URL;

export async function sendTwilioMessage(message, to) {
	const response = await fetch(`${bridgeUrl}send`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ message, to }),
	});

	const responseData = await response.json();
	return responseData ? responseData.success : false;
}
