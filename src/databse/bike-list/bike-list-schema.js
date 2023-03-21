const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeListModel = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
        kilometerRun: {
            type: Number,
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
        isReviewed: {
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

const BikeListSchema = mongoose.model("bikeLists", bikeListModel, "bikeLists");

module.exports = BikeListSchema;
