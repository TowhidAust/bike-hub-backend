const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { generateResponse } = require('../../helper');
const { ENV_VARIABLES } = require('../../utils/constants');

router.post('/', async (req, res) => {
	const { refreshToken } = req.body;
	jwt.verify(refreshToken, ENV_VARIABLES.REFRESH_TOKEN_SECRET, (err, jwtInfo) => {
		if (err) {
			return res.status(403).json(generateResponse(403, 'Unauthorized'));
		}

		const userData = {
			_id: jwtInfo?._id,
			firstname: jwtInfo?.firstname,
			lastname: jwtInfo?.lastname,
		};
		const newAccessToken = jwt.sign({ ...userData }, ENV_VARIABLES.ACCESS_TOKEN_SECRET, {
			expiresIn: ENV_VARIABLES.ACCESS_TOKEN_VALIDITY,
		});

		return res.status(200).json(
			generateResponse(200, 'Success', undefined, {
				accessToken: newAccessToken,
			}),
		);
	});
});

module.exports = router;
