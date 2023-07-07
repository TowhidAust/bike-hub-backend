const express = require('express');
const BikeListSchema = require('../../databse/bike-list/bike-list-schema');
const { promiseHandler, generateResponse } = require('../../helper');
const { validateApproveListedBikePayload } = require('./validation');
const { verifyToken } = require('../../middleware');
const router = express.Router();

router.patch('/', verifyToken, async (req, res) => {
	const payload = req?.body;
	const { isValid, details } = validateApproveListedBikePayload(payload);
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

	const bikeListId = req?.body?.bikeListId;
	const userId = req?.body?.userId;

	const [count, countErr] = await promiseHandler(BikeListSchema.countDocuments({ _id: bikeListId }));

	if (countErr) {
		return res.status(500, countErr?.message ?? 'Internal server error');
	}

	const [listedBikeData, listedBikeDataErr] = await promiseHandler(
		BikeListSchema.findOneAndUpdate(
			{ _id: bikeListId },
			{ isReviewed: true, approvedBy: userId },
			{
				new: true,
			},
		),
	);

	if (listedBikeDataErr) {
		return res.status(500, listedBikeDataErr?.message ?? 'Internal server error');
	}

	if (listedBikeData && count) {
		return res.status(200).json(generateResponse(200, 'Approved'));
	}
});

module.exports = router;
