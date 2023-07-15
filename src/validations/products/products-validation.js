const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { ENV_VARIABLES, USER_ROLES } = require('../../utils/constants');
const Signup = require('../../databse/auth/auth-schema');
const { promiseHandler } = require('../../utils/helper');

const isValidatedUser = async (req) => {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(' ')[1];
		const usersData = await jwt.verify(bearerToken, ENV_VARIABLES.ACCESS_TOKEN_SECRET);
		const userId = usersData?._id;
		const [data, error] = await promiseHandler(Signup.findById({ _id: userId }));
		if (error) {
			return false;
		}
		if (data?.role.includes(USER_ROLES.SELLER)) {
			return true;
		}
		return false;
	}

	return false;
};

const validateProductListPayload = (payload) => {
	const schema = Joi.object({
		ownerId: Joi.string(),
		title: Joi.string(),
		price: Joi.string(),
		images: Joi.array(),
		brand: Joi.string(),
		modelNo: Joi.string(),
		modelYear: Joi.string(),
		availableColors: Joi.array(),
		category: Joi.string(),
		isCertified: Joi.boolean(),
		certificationName: Joi.string(),
		quantity: Joi.number(),
		description: Joi.string(),
	});

	const val = schema.validate(payload, { abortEarly: false });

	if (val?.error) {
		return {
			isValid: false,
			message: val?.error?.details[0]?.message ?? 'Payload validation error',
			details: val?.error,
		};
	}

	return {
		isValid: true,
		message: 'Payload is valid',
		data: val?.value,
	};
};

module.exports = { isValidatedUser, validateProductListPayload };
