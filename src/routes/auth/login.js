const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Signup = require('../../databse/auth/auth-schema');
const { decryption, generateResponse } = require('../../helper');
const { ENV_VARIABLES } = require('../../utils/constants');
const { validateLoginPayload } = require('./validation');

router.post('/', async (req, res) => {
	const { phone, password } = req.body;
	const { isValid, message } = validateLoginPayload(req?.body);
	if (!isValid) {
		res.status(400);
		return res.json(generateResponse(400, message));
	}

	Signup.findOne({ phone: phone }, (error, data) => {
		if (error) {
			res.status(500);
			return res.json(generateResponse(500, error?.message));
		}

		if (data && password === decryption(data?.password)) {
			try {
				//creating a access token
				const accessToken = jwt.sign(
					{
						_id: data?._id,
						firstname: data?.firstname,
						lastname: data?.lastname,
					},
					ENV_VARIABLES.ACCESS_TOKEN_SECRET,
					{ expiresIn: ENV_VARIABLES.ACCESS_TOKEN_VALIDITY }
				);

				// creating refresh token
				const refreshToken = jwt.sign(
					{
						_id: data?._id,
						firstname: data?.firstname,
						lastname: data?.lastname,
					},
					ENV_VARIABLES.REFRESH_TOKEN_SECRET,
					{ expiresIn: ENV_VARIABLES.REFRESH_TOKEN_VALIDITY }
				);

				if (accessToken && refreshToken) {
					const userInfo = {
						id: data?._id,
						firstname: data?.firstname,
						lastname: data?.lastname,
						phone: data?.phone,
						role: data?.role,
					};
					res.status(200);
					return res.json(
						generateResponse(200, 'Login success', userInfo, {
							accessToken: accessToken,
							refreshToken: refreshToken,
						})
					);
				}
			} catch (error) {
				res.status(500);
				return res.json(
					generateResponse(500, error?.message ?? 'Jwt error')
				);
			}
		} else {
			res.status(403);
			res.json(generateResponse(403, 'Invalid credentials'));
		}
	});
});

module.exports = router;
