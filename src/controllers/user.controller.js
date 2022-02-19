const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

export const getUser = (req, res, next) => {
	const id = req.params.id;
	// Code here finds the details of the user with the id sent through the parameter.
}

export const getUsers = (req, res, next) => {

}

