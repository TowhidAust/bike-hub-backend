const express = require('express');
const { verifyToken } = require('../../../middleware');
const ProductSchema = require('../../../databse/products/product-schema');
const { generateResponse, promiseHandler } = require('../../../utils/helper');
const { isValidatedUser, validateUpdateProductPayload } = require('../../../validations/products/products-validation');

const router = express.Router();

router.patch('/:prodId', verifyToken, async (req, res) => {
	const prodId = req?.params?.prodId;
	const payload = req?.body;
	const isUserIsValidSeller = await isValidatedUser(req);
	const { isValid, details } = validateUpdateProductPayload(payload);
	if (!prodId) {
		return res.status(400).json(generateResponse(400, 'Product id is not valid'));
	}
	if (!isUserIsValidSeller) {
		return res.status(403).json(generateResponse(403, 'User is not a seller'));
	}
	if (!isValid) {
		return res.status(400).json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}

	const [data, error] = await promiseHandler(ProductSchema.findByIdAndUpdate(prodId, payload));
	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}
	if (data) {
		return res.status(200).json(generateResponse(200, 'Successfully updated', data));
	}
	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
