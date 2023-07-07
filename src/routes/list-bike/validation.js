const Joi = require('joi');
const validateListBikePayload = (payload) => {
	const schema = Joi.object({
		userId: Joi.string().required(),
		bikeCode: Joi.string().optional(),
		price: Joi.string().required(),
		bikeName: Joi.string().required(),
		bikeBrand: Joi.string().required(),
		bikeModelYear: Joi.string().required(),
		images: Joi.array().required(),
		registrationZone: Joi.string().required(),
		yearOfRegistration: Joi.string().required(),
		kmRun: Joi.string().required(),
		durationOfRegistration: Joi.string().required(),
		isAccidentHistory: Joi.boolean().required(),
		ownerShipStatus: Joi.string().required().valid('1st Owner', '2nd Owner', '3rd Owner', '4th Owner', '5th Owner'),
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

module.exports = {
	validateListBikePayload,
};
