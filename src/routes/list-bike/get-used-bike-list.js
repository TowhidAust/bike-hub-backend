const express = require('express');
const BikeListSchema = require('../../databse/bike-list/bike-list-schema');
const { promiseHandler, generateResponse } = require('../../utils/helper');
const router = express.Router();

router.get('/', async (req, res) => {
	const queryParams = req.query;
	const page = parseInt(queryParams?.page) || 0;
	const pageSize = parseInt(queryParams?.pageSize) || 0;

	const [count, countErr] = await promiseHandler(BikeListSchema.countDocuments());

	if (countErr) {
		res.status(500);
		return res.json(generateResponse(500, countErr?.message ?? 'Internal server error'));
	}

	const [usedBikesBikesData, usedBikesDataErr] = await promiseHandler(
		BikeListSchema.find() //{ isReviewed: false }
			.skip(page * pageSize)
			.limit(pageSize),
	);

	if (usedBikesDataErr) {
		res.status(500);
		return res.json(generateResponse(500, usedBikesDataErr?.message ?? 'Internal server error'));
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
