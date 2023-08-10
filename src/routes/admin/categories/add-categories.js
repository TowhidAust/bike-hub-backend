const express = require('express');
const { verifyToken } = require('../../../middleware');
const CategorySchema = require('../../../databse/categories/category-schema');
const { promiseHandler, generateResponse } = require('../../../utils/helper');
const { validateUserByRole } = require('../../../validations');
const { validateCategoryPayload } = require('../../../validations/categories/category-validation');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
	const body = req?.body;
	const isSuperAdmin = validateUserByRole(req, 'SUPER_ADMIN');
	const categorySchema = new CategorySchema(body);
	const { isValid, details } = validateCategoryPayload(body);

	if (!isValid) {
		return res.status(400).json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}

	if (!isSuperAdmin) {
		return res.status(403).json(generateResponse(403, 'User is not a super admin'));
	}
	const [data, error] = await promiseHandler(categorySchema.save());

	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}

	if (data) {
		return res.status(200).json(generateResponse(200, 'Saved successfully', data));
	}

	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
