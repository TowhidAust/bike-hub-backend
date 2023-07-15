const Joi = require('joi');

const validateSignupPayload = (payload) => {
	const schema = Joi.object({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		phone: Joi.string().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		confirmPassword: Joi.ref('password'),
		role: Joi.array().required(),
	}).with('password', 'confirmPassword');

	const val = schema.validate(payload);

	if (val?.error) {
		return {
			isValid: false,
			message: val?.error?.details[0]?.message ?? 'Payload validation error',
		};
	}

	return {
		isValid: true,
		message: 'Payload is valid',
		data: val?.value,
	};
};

const validateLoginPayload = (payload) => {
	const schema = Joi.object({
		phone: Joi.string().required(),
		password: Joi.string().required(),
	});

	const val = schema.validate(payload);

	if (val?.error) {
		return {
			isValid: false,
			message: val?.error?.details[0]?.message ?? 'Payload validation error',
		};
	}

	return {
		isValid: true,
		message: 'Payload is valid',
		data: val?.value,
	};
};

module.exports = {
	validateSignupPayload,
	validateLoginPayload,
};
