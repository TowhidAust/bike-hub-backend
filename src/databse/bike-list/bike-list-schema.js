const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeListModel = new Schema(
	{
		userId: String,
		bikeCode: String,
		bikeName: String,
		images: Array,
		registrationZone: String,
		yearOfRegistration: String,
		kmRun: String,
		durationOfRegistration: String,
		bikeModelYear: String,
		isAccidentHistory: Boolean,
		ownerShipStatus: String,
		division: String,
		phone: String,
		address: String,
		detailDescription: String,
		district: String,
	},
	{ timestamps: true }
);

const BikeListSchema = mongoose.model('bikelists', bikeListModel);

module.exports = BikeListSchema;
