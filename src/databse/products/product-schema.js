const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema(
	{
		ownerId: String,
		title: String,
		category: Array,
		isSku: Boolean,
		price: Number,
		brand: String,
		modelNo: String,
		modelYear: String,
		madeIn: String,
		thumnail: String,
		images: Array,
		isCertified: Boolean,
		certificationName: String,
		quantity: Number,
		description: String,
		warranty: Number,
		warrantyUnit: String,
	},
	{ timestamps: true },
);

const ProductSchema = mongoose.model('products', productModel);

module.exports = ProductSchema;
