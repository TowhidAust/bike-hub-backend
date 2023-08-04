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
		category: Joi.array().required(), // ['HELMET']
		hasSku: Joi.boolean().required(),
		price: Joi.number().required(),
		discount: Joi.number().optional(),
		quantity: Joi.number().required(),
		inStock: Joi.boolean().required(),
		brand: Joi.string().required(),
		modelNo: Joi.string().required(),
		modelYear: Joi.string().required(),
		madeIn: Joi.string().required(),
		thumbnail: Joi.string().required(),
		images: Joi.array().required(),
		isCertified: Joi.boolean().optional(),
		certificationName: Joi.string().optional(),
		description: Joi.string().required(),
		warranty: Joi.number().optional(),
		warrantyUnit: Joi.string().optional(),
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
const validateUpdateProductPayload = (payload) => {
	const schema = Joi.object({
		title: Joi.string().optional(),
		category: Joi.array().optional(), // ['HELMET']
		hasSku: Joi.boolean().optional(),
		price: Joi.number().optional(),
		discount: Joi.number().optional(),
		quantity: Joi.number().optional(),
		inStock: Joi.boolean().optional(),
		brand: Joi.string().optional(),
		modelNo: Joi.string().optional(),
		modelYear: Joi.string().optional(),
		madeIn: Joi.string().optional(),
		thumbnail: Joi.string().optional(),
		images: Joi.array().optional(),
		isCertified: Joi.boolean().optional(),
		certificationName: Joi.string().optional(),
		description: Joi.string().optional(),
		warranty: Joi.number().optional(),
		warrantyUnit: Joi.string().optional(),
		isArchived: Joi.boolean().optional(),
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

const validateAddProductVariantPayload = (payload) => {
	const schema = Joi.object({
		productId: Joi.string().required(),
		price: Joi.number().required(),
		discount: Joi.number().optional(),
		color: Joi.string().required(),
		thumbnail: Joi.string().optional(),
		sizes: Joi.array()
			.items(
				Joi.object().keys({
					_id: Joi.string().required(),
					size: Joi.string().required(),
					inStock: Joi.boolean().required(),
					quantity: Joi.number().required(),
				}),
			)
			.required(),
		isArchived: Joi.boolean().optional(),
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

const validateUpdateProductVariantPayload = (payload) => {
	const schema = Joi.object({
		price: Joi.number().optional(),
		discount: Joi.number().optional(),
		color: Joi.string().optional(),
		thumbnail: Joi.string().optional(),
		sizes: Joi.array()
			.items(
				Joi.object().keys({
					size: Joi.string().optional(),
					inStock: Joi.boolean().optional(),
					quantity: Joi.number().optional(),
				}),
			)
			.optional(),
		isArchived: Joi.boolean().optional(),
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

module.exports = {
	isValidatedUser,
	validateProductListPayload,
	validateAddProductVariantPayload,
	validateUpdateProductPayload,
	validateUpdateProductVariantPayload,
};
