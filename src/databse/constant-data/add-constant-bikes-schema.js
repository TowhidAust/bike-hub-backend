const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constantBikesModel = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        cc: {
            type: String,
            required: true,
        },
        bikeType: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
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
            type: String,
            required: true,
        },
        noOfCylinders: {
            type: String,
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
            type: String,
            required: true,
        },
        clutchType: {
            type: String,
            required: true,
        },
        milage: {
            type: String,
            required: true,
        },
        topSpeed: {
            type: String,
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
            type: String,
            required: true,
        },
        rearBrakeType: {
            type: String,
            required: true,
        },
        rearBrakeDiameter: {
            type: String,
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
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        weight: {
            type: String,
            required: true,
        },
        wheelbase: {
            type: String,
            required: true,
        },
        overallWidth: {
            type: String,
            required: true,
        },
        groundClearence: {
            type: String,
            required: true,
        },
        fuelTankCapacity: {
            type: String,
            required: true,
        },
        seatHeight: {
            type: String,
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

const ConstantBikeSchema = mongoose.model("constantbikes", constantBikesModel);

module.exports = ConstantBikeSchema;
