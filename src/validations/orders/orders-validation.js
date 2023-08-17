const Joi = require('joi');
const validateOrdersPayload = (payload) => {
	const itemsSchema = Joi.object().keys({
		hasSku: Joi.boolean().required(),
		productId: Joi.string().required(),
		variantId: Joi.string().optional(),
		sizeId: Joi.string().optional(),
		quantity: Joi.number().required(),
	});

	const schema = Joi.object({
		userId: Joi.string().required(),
		paymentMethod: Joi.string().required(),
		paymentStatus: Joi.boolean().required(),
		transactionId: Joi.string().optional(),
		transactionEntryLogId: Joi.string().optional(),
		deliveryStatus: Joi.boolean(),
		items: Joi.array().items(itemsSchema),
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

const validateUpdateOrderPayload = (payload) => {
	const itemsSchema = Joi.object().keys({
		hasSku: Joi.boolean().optional(),
		quantity: Joi.number().optional(),
	});
	const schema = Joi.object({
		isCancelled: Joi.boolean().optional(),
		paymentStatus: Joi.boolean().optional(),
		paymentMethod: Joi.string().valid('CASH', 'DIGITAL').optional(),
		deliveryStatus: Joi.boolean().optional(),
		items: Joi.array().items(itemsSchema),
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
