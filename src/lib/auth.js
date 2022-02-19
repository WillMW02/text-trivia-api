import jsonwebtoken from 'jsonwebtoken';

export const generateJWT = async (id, expiresIn = '2h') => {
	const jwt = jsonwebtoken.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn,
	});
	return jwt;
};
  
export const verifyJWT = async jwt => {
	return await new Promise((resolve) => {
		jsonwebtoken.verify(jwt, process.env.TOKEN_SECRET, (err, user) => {
			resolve({ err, user });
		});
	});
};