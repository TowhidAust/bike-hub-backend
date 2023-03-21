const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeListModel = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
        kilometer: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        cc: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isNegotiate: {
            type: Boolean,
            required: true,
        },
        review: {
            type: Boolean,
            required: true,
        },
        frontBrake: {
            type: String,
            required: true,
        },
        rareBrake: {
            type: String,
            required: true,
        },
        frontTire: {
            type: String,
            required: true,
        },
        rareTire: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

const Signup = mongoose.model("BikeList", bikeListModel);

module.exports = Signup;
