const jwt = require('jsonwebtoken');
const { ENV_VARIABLES } = require('../utils/constants');
const { generateResponse } = require('../utils/helper');

async function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		req.token = bearerToken;
		try {
			const usersData = await jwt.verify(req.token, ENV_VARIABLES.ACCESS_TOKEN_SECRET);
			if (usersData) next();
		} catch (error) {
			if (error) {
				res.status(403);
				return res.json(generateResponse(403, 'Unauthorized user'));
			}
		}
	} else {
		res.status(403);
		return res.json(generateResponse(403, 'No bearer token found'));
	}
}

module.exports = {
	verifyToken,
};
