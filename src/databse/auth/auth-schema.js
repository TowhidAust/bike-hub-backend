const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupModel = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		confirmPassword: {
			type: String,
		},
		role: {
			// BUYER, SELLER, INDIVIDUAL_SELLER, SUPER_ADMIN,
			type: Array,
			required: true,
		},
		division: {
			type: String
		},
		district: {
			type: String
		},
		address: {
			type: String
		},
		deliveryLocation: {
			division: String,
			district: String,
			address: String
		}
	},
	{ timestamps: true }
);

const Signup = mongoose.model('users', signupModel, 'users');

module.exports = Signup;
