const express = require('express');
const Signup = require('../../databse/auth/auth-schema');
const BikeListSchema = require('../../databse/bike-list/bike-list-schema');
const { generateResponse } = require('../../helper');
const { validateListBikePayload } = require('./validation');
const { verifyToken } = require('../../middleware');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
	const payload = req?.body;
	const { isValid, details } = validateListBikePayload(payload);
	if (!isValid) {
		res.status(400);
		return res.json(
			generateResponse(400, 'Payload is not valid', undefined, {
				details: {
					type: 'FIELD_ERROR',
					details,
				},
			}),
		);
	}
	// verify the userId provided
	Signup.findById({ _id: payload?.userId }, async (error, snapshot) => {
		if (error) {
			res.status(500);
			return res.json(generateResponse(500, error?.message || 'User not found'));
		}

		if (snapshot) {
			const newBikeList = new BikeListSchema(payload);
			newBikeList.save((error, result) => {
				if (error) {
					return res.json(generateResponse(500, error?.message));
				}

				if (result) {
					return res.json(generateResponse(200, 'Bike listed successfully'));
				}
			});
		}
	});
});

module.exports = router;
