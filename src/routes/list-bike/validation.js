const Joi = require('joi');
const validateListBikePayload = (payload) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		isReviewed: Joi.boolean().required(),
		bikeCode: Joi.string().optional(),
		price: Joi.string().required(),
		isNegotiable: Joi.boolean().required(),
		bikeName: Joi.string().required(),
		bikeBrand: Joi.string().required(),
		cc: Joi.number().required(),
		bikeModelYear: Joi.string().required(),
		images: Joi.array().required(),
		registrationZone: Joi.string().required(),
		yearOfRegistration: Joi.string().required(),
		kmRun: Joi.string().required(),
		durationOfRegistration: Joi.string().required(),
		isAccidentHistory: Joi.boolean().required(),
		ownerShipStatus: Joi.string().required().valid('1st', '2nd', '3rd', '4th', '5th'),
		division: Joi.string().required(),
		phone: Joi.string().required(),
		address: Joi.string().required(),
		detailDescription: Joi.string().required(),
		district: Joi.string().required(),
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

const validateApproveListedBikePayload = (payload) => {
	const schema = Joi.object({
		bikeListId: Joi.string().required(),
		userId: Joi.string().required(),
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
	validateListBikePayload,
	validateApproveListedBikePayload,
};
