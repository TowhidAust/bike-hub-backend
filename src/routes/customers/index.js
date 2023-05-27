const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../middleware');
const { ENV_VARIABLES } = require('../../utils/constants');
router.get('/', verifyToken, (req, res) => {
	jwt.verify(
		req.token,
		ENV_VARIABLES.ACCESS_TOKEN_SECRET,
		(err, userData) => {
			if (err) {
				res.json({
					message: 'jwt token not valid',
					error: err,
				});
			} else {
				res.json({
					message: 'jwt verified',
					data: userData,
				});
			}
		}
	);
});

module.exports = router;
