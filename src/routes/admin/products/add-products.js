const express = require('express');
const { verifyToken } = require('../../../middleware');
const ProductSchema = require('../../../databse/products/product-schema');
const { generateResponse, promiseHandler } = require('../../../utils/helper');
const { isValidatedUser, validateProductListPayload } = require('../../../validations/products/products-validation');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
	const payload = req?.body;
	const isUserIsValidSeller = await isValidatedUser(req);
	if (!isUserIsValidSeller) {
		return res.status(403).json(generateResponse(403, 'User is not a seller'));
	}
	const { isValid, details } = validateProductListPayload(payload);
	if (!isValid) {
		return res.status(400).json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}

	// save into database
	const addProduct = new ProductSchema(payload);
	const [data, error] = await promiseHandler(addProduct.save());
	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}
	if (data) {
		return res.status(200).json(generateResponse(200, 'Data saved successfully', data));
	}
	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
