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
		if (data?.role.includes(USER_ROLES.SELLER) || data?.role?.includes(USER_ROLES.SUPER_ADMIN)) {
			return true;
		}
		return false;
	}

	return false;
};

const validateProductListPayload = (payload) => {
	const schema = Joi.object({
		ownerId: Joi.string().required(),
		title: Joi.string().required(),
		category: Joi.string().required(),
		isSku: Joi.boolean().required(),
		price: Joi.number().required(),
		brand: Joi.string().required(),
		modelNo: Joi.string().required(),
		modelYear: Joi.string().required(),
		madeIn: Joi.string().required(),
		thumnail: Joi.string().required(),
		images: Joi.array().required(),
		isCertified: Joi.boolean().optional(),
		certificationName: Joi.string().optional(),
		quantity: Joi.number().required(),
		description: Joi.string().required(),
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
