const Joi = require('joi');
const validateOrdersPayload = (payload) => {
	const schema = Joi.object({
		paymentMethod: Joi.string().required(),
		paymentStatus: Joi.boolean().required(),
		transactionId: Joi.string().optional(),
		transactionEntryLogId: Joi.string().optional(),
		items: Joi.array().items(
			Joi.object({
				userId: Joi.string().required(),
				productId: Joi.string().required(),
				variantId: Joi.string().optional(),
				sizeId: Joi.string().optional(),
				hasSku: Joi.string().required(),
				quantity: Joi.number().required(),
			}),
		),
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

// TODO need to fix later
const validateUpdateOrderPayload = (payload) => {
	const schema = Joi.object({
		quantity: Joi.number().optional(),
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
	validateOrdersPayload,
	validateUpdateOrderPayload,
};
