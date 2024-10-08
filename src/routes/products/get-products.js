const express = require('express');
const ProductSchema = require('../../databse/products/product-schema');
const { promiseHandler, generateResponse } = require('../../utils/helper');
const router = express.Router();
router.get('/', async (req, res) => {
	const { category, id } = req.query;
	const page = parseInt(req?.query?.page) || 0;
	const pageSize = parseInt(req?.query?.pageSize) || 0;

	const [products, error] = await promiseHandler(
		ProductSchema.find({
			$or: [{ category: [category] }, { _id: id }],
		})
			.skip(page * pageSize)
			.limit(pageSize),
	);

	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}

	if (products) {
		return res.status(200).json(generateResponse(200, 'Success', products));
	}

	return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
});

module.exports = router;
