const express = require('express');
const ConstantBikeSchema = require('../../databse/constant-data/add-constant-bikes-schema');
const { promiseHandler, generateResponse } = require('../../utils/helper');
const { verifyToken } = require('../../middleware');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
	const queryParams = req.query;
	const page = parseInt(queryParams?.page) || 0;
	const pageSize = parseInt(queryParams?.pageSize) || 0;

	const [count, countErr] = await promiseHandler(ConstantBikeSchema.countDocuments());

	if (countErr) {
		return res.status(500, countErr?.message ?? 'Internal server error');
	}

	const [constantBikesData, constantBikeDataErr] = await promiseHandler(
		ConstantBikeSchema.find()
			.skip(page * pageSize)
			.limit(pageSize),
	);
	if (constantBikeDataErr) {
		return res.status(500, constantBikeDataErr?.message ?? 'Internal server error');
	}

	if (constantBikesData && count) {
		return res.status(200).json(
			generateResponse(200, 'Get constant bike sucess', constantBikesData, {
				totalCount: count,
				page: page,
				pageSize: pageSize,
			}),
		);
	}
});

module.exports = router;
