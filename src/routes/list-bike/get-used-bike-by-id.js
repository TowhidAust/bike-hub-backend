const express = require('express');
const BikeListSchema = require('../../databse/bike-list/bike-list-schema');
const { promiseHandler, generateResponse } = require('../../helper');
const router = express.Router();

router.get('/:id', async (req, res) => {
	const bikeId = req?.params?.id;
	if (!bikeId) {
		return res.status(400).json(generateResponse(400, 'Bike id is not valid'));
	}
	const [singleBikeData, findByIdError] = await promiseHandler(BikeListSchema.findById(bikeId));
	if (findByIdError) {
		res.status(500);
		return res.json(generateResponse(500, findByIdError?.message ?? 'Find bike by id is not found'));
	}

	if (singleBikeData) {
		res.status(200);
		return res.json(generateResponse(200, 'Bike found successfully', singleBikeData));
	}
});

module.exports = router;
