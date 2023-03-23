const Joi = require('joi');
const validateAddConstantBikePayload = (payload) => {
    const schema = Joi.object({
        bikeCode: Joi.number().required(),
        title: Joi.string().required(),
        currentPrice: Joi.number().required(),
        cc: Joi.number().required(),
        bikeType: Joi.string().valid('SPORTS', 'COMMUTER').required(),
        publishYear: Joi.number().required(),
        brand: Joi.string().required(),
        madeIn: Joi.string().required(),
        assembleIn: Joi.string().required(),
        distributor: Joi.string().required(),
        engineType: Joi.string().required(),
        maximumPower: Joi.string().required(),
        fuelSupply: Joi.string().required(),
        engineCooling: Joi.string()
            .valid('LIQUID_COOL', 'WATER_COOL', 'AIR_COOL')
            .required(),
        displacement: Joi.string().required(),
        maximumTorque: Joi.string().required(),
        valves: Joi.number().required(),
        noOfCylinders: Joi.number().required(),
        startingMethod: Joi.string()
            .valid('ELECTRIC', 'KICK', 'ELECTRIC_AND_KICK')
            .required(),
        transmissionType: Joi.string().valid('MANUAL', 'AUTO').required(),
        noOfGears: Joi.number().required(),
        clutchType: Joi.string().required(),
        milage: Joi.number().required(),
        topSpeed: Joi.number().required(),
        chassisType: Joi.string().required(),
        frontSuspension: Joi.string().required(),
        rearSuspension: Joi.string().required(),
        frontBrakeType: Joi.string().required(),
        frontBrakeDiameter: Joi.number().required(),
        rearBrakeType: Joi.string().required(),
        rearBrakeDiameter: Joi.number().required(),
        antiLockBraking: Joi.string().required(),
        frontTireSize: Joi.string().required(),
        rearTireSize: Joi.string().required(),
        wheelType: Joi.string().required(),
        tireType: Joi.string().valid('TUBELESS', 'TUBE').required(),
        overallLength: Joi.number().required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
        wheelbase: Joi.number().required(),
        overallWidth: Joi.number().required(),
        groundClearence: Joi.number().required(),
        fuelTankCapacity: Joi.number().required(),
        seatHeight: Joi.number().required(),
        batteryType: Joi.string().required(),
        batteryVoltage: Joi.string().required(),
        headLight: Joi.string().required(),
        tailLight: Joi.string().required(),
        indicators: Joi.string().required(),
        seatType: Joi.string().required(),
        speedometer: Joi.string().valid('DIGITAL', 'ANALOG').required(),
        odometer: Joi.string().valid('DIGITAL', 'ANALOG').required(),
        rpmMeter: Joi.string().valid('DIGITAL', 'ANALOG').required(),
        handleType: Joi.string().required(),
        isPassengerGrabRail: Joi.boolean().required(),
        isEngineKillSwitch: Joi.boolean().required(),
        imageUrl: Joi.string().required(),
        description: Joi.string().required(),
    }).with('password', 'confirmPassword');

    const val = schema.validate(payload, { abortEarly: false });

    if (val?.error) {
        return {
            isValid: false,
            message:
                val?.error?.details[0]?.message ?? 'Payload validation error',
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
    validateAddConstantBikePayload,
};
