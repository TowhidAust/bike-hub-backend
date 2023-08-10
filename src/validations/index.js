const jwt = require('jsonwebtoken');
const Signup = require('../databse/auth/auth-schema');
const { ENV_VARIABLES, USER_ROLES } = require('../utils/constants');
const { promiseHandler } = require('../utils/helper');

const validateUserByRole = async (req, userType) => {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		const usersData = await jwt.verify(bearerToken, ENV_VARIABLES.ACCESS_TOKEN_SECRET);
		const userId = usersData?._id;
		const [data, error] = await promiseHandler(Signup.findById({ _id: userId }));
		if (error) {
			return false;
		}
		if (data?.role.includes(USER_ROLES[userType])) {
			return true;
		}
		return false;
	}

	return false;
};

module.exports = { validateUserByRole };
