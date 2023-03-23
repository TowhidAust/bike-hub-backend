const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constantBikesModel = new Schema(
    {
        bikeCode: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        cc: {
            type: Number,
            required: true,
        },
        bikeType: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        madeIn: {
            type: String,
            required: true,
        },
        assembleIn: {
            type: String,
            required: true,
        },
        distributor: {
            type: String,
            required: true,
        },
        engineType: {
            type: String,
            required: true,
        },
        maximumPower: {
            type: String,
            required: true,
        },
        fuelSupply: {
            type: String,
            required: true,
        },
        engineCooling: {
            type: String,
            required: true,
        },
        displacement: {
            type: String,
            required: true,
        },
        maximumTorque: {
            type: String,
            required: true,
        },
        valves: {
            type: Number,
            required: true,
        },
        noOfCylinders: {
            type: Number,
            required: true,
        },
        startingMethod: {
            type: String,
            required: true,
        },
        transmissionType: {
            type: String,
            required: true,
        },
        noOfGears: {
            type: Number,
            required: true,
        },
        clutchType: {
            type: String,
            required: true,
        },
        milage: {
            type: Number,
            required: true,
        },
        topSpeed: {
            type: Number,
            required: true,
        },
        chassisType: {
            type: String,
            required: true,
        },
        rearSuspension: {
            type: String,
            required: true,
        },
        frontSuspension: {
            type: String,
            required: true,
        },
        frontBrakeType: {
            type: String,
            required: true,
        },
        frontBrakeDiameter: {
            type: Number,
            required: true,
        },
        rearBrakeType: {
            type: String,
            required: true,
        },
        rearBrakeDiameter: {
            type: Number,
            required: true,
        },
        antiLockBraking: {
            type: String,
            required: true,
        },
        frontTireSize: {
            type: String,
            required: true,
        },
        rearTireSize: {
            type: String,
            required: true,
        },
        wheelType: {
            type: String,
            required: true,
        },
        tireType: {
            type: String,
            required: true,
        },
        overallLength: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        wheelbase: {
            type: Number,
            required: true,
        },
        overallWidth: {
            type: Number,
            required: true,
        },
        groundClearence: {
            type: Number,
            required: true,
        },
        fuelTankCapacity: {
            type: Number,
            required: true,
        },
        seatHeight: {
            type: Number,
            required: true,
        },
        batteryType: {
            type: String,
            required: true,
        },
        batteryVoltage: {
            type: String,
            required: true,
        },
        headLight: {
            type: String,
            required: true,
        },
        tailLight: {
            type: String,
            required: true,
        },
        indicators: {
            type: String,
            required: true,
        },
        speedometer: {
            type: String,
            required: true,
        },
        rpmMeter: {
            type: String,
            required: true,
        },
        seatType: {
            type: String,
            required: true,
        },
        odometer: {
            type: String,
            required: true,
        },
        handleType: {
            type: String,
            required: true,
        },
        isPassengerGrabRail: {
            type: Boolean,
            required: true,
        },
        isEngineKillSwitch: {
            type: Boolean,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ConstantBikeSchema = mongoose.model('constantbikes', constantBikesModel);

module.exports = ConstantBikeSchema;
