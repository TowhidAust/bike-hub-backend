const Joi = require('joi');

const validateCategoryPayload = (payload) => {
	const schema = Joi.object({
		categoryName: Joi.string().required(),
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
	validateCategoryPayload,
};
