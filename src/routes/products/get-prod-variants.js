const express = require('express');
const { promiseHandler, generateResponse } = require('../../utils/helper');
const ProductVariantSchema = require('../../databse/products/product-variant-schema');
const router = express.Router();
router.get('/:id', async (req, res) => {
	const productId = req?.params?.id;
	if (!productId) {
		return res.status(400).json(generateResponse(400, 'Product Id is not valid'));
	}
	const [products, error] = await promiseHandler(ProductVariantSchema.find({ productId }));
	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}
	if (products) {
		return res.status(200).json(generateResponse(200, 'Success', products));
	}
});

module.exports = router;
