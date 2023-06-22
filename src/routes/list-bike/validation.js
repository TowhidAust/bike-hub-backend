const Joi = require('joi');
const validateListBikePayload = (payload) => {
	const schema = Joi.object({
		price: Joi.string().required(),
		userId: Joi.string().required(),
		bikeCode: Joi.string().required(),
		bikeName: Joi.string().required(),
		images: Joi.string().required(),
		registrationZone: Joi.string().required(),
		yearOfRegistration: Joi.string().required(),
		kmRun: Joi.string().required(),
		durationOfRegistration: Joi.string().required(),
		bikeModelYear: Joi.string().required(),
		isAccidentHistory: Joi.boolean().required(),
		ownerShipStatus: Joi.string().required(),
		division: Joi.string().required(),
		phone: Joi.string().required(),
		address: Joi.string().required(),
		detailDescription: Joi.string().required(),
		district: Joi.string().required(),
	}).with('password', 'confirmPassword');

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
