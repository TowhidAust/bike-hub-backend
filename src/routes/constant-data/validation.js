const Joi = require("joi");
// title
// currentPrice
// cc
// bikeType
// publishYear
// brand
// madeIn
// assembleIn
// distributor
// engineType
// maximumPower
// fuelSupply
// engineCooling
// displacement
// maximumTorque
// valves
// noOfCylinders
// startingMethod
// transmissionType
// noOfGears
// clutchType
// milage
// topSpeed
// chassisType
// rearSuspension
// frontSuspension
// frontBrakeType
// frontBrakeDiameter
// rearBrakeType
// rearBrakeDiameter
// antiLockBraking
// frontTireSize
// rearTireSize
// wheelType
// tireType
// overallLength
// height
// weight
// wheelbase
// overallWidth
// groundClearence
// fuelTankCapacity
// seatHeight
// batteryType
// batteryVoltage
// headLight
// tailLight
// indicators
// speedometer
// rpmMeter
// seatType
// odometer
// handleType
// isPassengerGrabRail
// isEngineKillSwitch
// imageUrl
// description
const validateAddConstantBikePayload = (payload) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        currentPrice: Joi.string().required(),
        cc: Joi.string().required(),
        bikeType: Joi.string().required(),
        publishYear: Joi.string().required(),
        brand: Joi.string().required(),
        madeIn: Joi.string().required(),
        assembleIn: Joi.string().required(),
        distributor: Joi.string().required(),
        engineType: Joi.string().required(),
        maximumPower: Joi.string().required(),
        fuelSupply: Joi.string().required(),
        engineCooling: Joi.string().required(),
        displacement: Joi.string().required(),
        maximumTorque: Joi.string().required(),
        valves: Joi.string().required(),
        noOfCylinders: Joi.string().required(),
        startingMethod: Joi.string().required(),
        transmissionType: Joi.string().required(),
        noOfGears: Joi.string().required(),
        clutchType: Joi.string().required(),
        milage: Joi.string().required(),
        topSpeed: Joi.string().required(),
        chassisType: Joi.string().required(),
        rearSuspension: Joi.string().required(),
        frontSuspension: Joi.string().required(),
        frontBrakeType: Joi.string().required(),
        frontBrakeDiameter: Joi.string().required(),
        rearBrakeType: Joi.string().required(),
        rearBrakeDiameter: Joi.string().required(),
        antiLockBraking: Joi.string().required(),
        frontTireSize: Joi.string().required(),
        rearTireSize: Joi.string().required(),
        wheelType: Joi.string().required(),
        tireType: Joi.string().required(),
        overallLength: Joi.string().required(),
        height: Joi.string().required(),
        weight: Joi.string().required(),
        wheelbase: Joi.string().required(),
        overallWidth: Joi.string().required(),
        groundClearence: Joi.string().required(),
        fuelTankCapacity: Joi.string().required(),
        seatHeight: Joi.string().required(),
        batteryType: Joi.string().required(),
        batteryVoltage: Joi.string().required(),
        headLight: Joi.string().required(),
        tailLight: Joi.string().required(),
        indicators: Joi.string().required(),
        speedometer: Joi.string().required(),
        rpmMeter: Joi.string().required(),
        seatType: Joi.string().required(),
        odometer: Joi.string().required(),
        handleType: Joi.string().required(),
        isPassengerGrabRail: Joi.string().required(),
        isEngineKillSwitch: Joi.string().required(),
        imageUrl: Joi.string().required(),
        description: Joi.string().required(),
    }).with('password', 'confirmPassword');

    const val = schema.validate(payload);

    if (val?.error) {
        return {
            isValid: false,
            message: val?.error?.details[0]?.message ?? 'Payload validation error'
        }
    }

    return {
        isValid: true,
        message: 'Payload is valid',
        data: val?.value,
    }
}