const express = require('express');
const { verifyToken } = require('../../../middleware');
const { generateResponse, promiseHandler } = require('../../../utils/helper');
const { validateUserByRole } = require('../../../validations');
const CategorySchema = require('../../../databse/categories/category-schema');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
	const isSuperAdmin = validateUserByRole(req, 'SUPER_ADMIN');

	if (!isSuperAdmin) {
		return res.status(403).json(generateResponse(403, 'User is not a super admin'));
	}

	const [data, error] = await promiseHandler(CategorySchema.find());

	if (error) {
		return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong!'));
	}

	if (data) {
		return res.status(200).json(generateResponse(200, 'Get category success', data));
	}

	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
