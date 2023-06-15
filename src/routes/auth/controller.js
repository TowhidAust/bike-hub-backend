const jwt = require('jsonwebtoken');
const Signup = require('../../databse/auth/auth-schema');
const { generateResponse } = require('../../helper');
const { ENV_VARIABLES } = require('../../utils/constants');

const generateJwtAndSaveUsersData = async (usersData, res) => {
	// save into db in users collection
	delete usersData.confirmPassword;
	const signup = new Signup(usersData);

	try {
		const data = await signup.save();

		// we should not save any password in jwt so removing it
		const dataWithoutPassword = {
			_id: data?._id,
			firstname: data?.firstname,
			lastname: data?.lastname,
			phone: data?.phone,
			role: data?.role,
			createdAt: data?.createdAt,
		};

		const accessToken = jwt.sign({ ...dataWithoutPassword }, ENV_VARIABLES.ACCESS_TOKEN_SECRET, {
			expiresIn: ENV_VARIABLES.ACCESS_TOKEN_VALIDITY,
		});

		const refreshToken = jwt.sign({ ...dataWithoutPassword }, ENV_VARIABLES.REFRESH_TOKEN_SECRET, {
			expiresIn: ENV_VARIABLES.REFRESH_TOKEN_VALIDITY,
		});

		if (accessToken && refreshToken) {
			res.status(200);
			return res.json(
				generateResponse(200, 'User created successfully', null, {
					accessToken: accessToken,
					refreshToken: refreshToken,
					result: dataWithoutPassword,
				}),
			);
		}
	} catch (error) {
		res.status(500);
		return res.json(generateResponse(500, error?.message ?? 'Internal server error'));
	}
};

module.exports = {
	generateJwtAndSaveUsersData,
};
