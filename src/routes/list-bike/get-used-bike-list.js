const express = require('express');
const BikeListSchema = require('../../databse/bike-list/bike-list-schema');
const { promiseHandler, generateResponse } = require('../../helper');
const { verifyToken } = require('../../middleware');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
	const queryParams = req.query;
	const page = parseInt(queryParams?.page) || 0;
	const pageSize = parseInt(queryParams?.pageSize) || 0;

	const [count, countErr] = await promiseHandler(BikeListSchema.countDocuments());

	if (countErr) {
		return res.status(500, countErr?.message ?? 'Internal server error');
	}

	const [usedBikesBikesData, usedBikesDataErr] = await promiseHandler(
		BikeListSchema.find({ isReviewed: false }) // todo need to make it true. using false for now to show it in frontend
			.skip(page * pageSize)
			.limit(pageSize),
	);

	if (usedBikesDataErr) {
		return res.status(500, usedBikesDataErr?.message ?? 'Internal server error');
	}

	if (usedBikesBikesData && count) {
		return res.status(200).json(
			generateResponse(200, 'Get bike list success', usedBikesBikesData, {
				totalCount: count,
				page: page,
				pageSize: pageSize,
			}),
		);
	}
});

module.exports = router;
