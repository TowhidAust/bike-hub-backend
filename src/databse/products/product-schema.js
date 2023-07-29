const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema(
	{
		// ownerId: String,
		// title: String,
		// price: String,
		// images: Array,
		// brand: String,
		// modelNo: String,
		// modelYear: String,
		// availableColors: Array,
		// category: String,
		// isCertified: Boolean,
		// certificationName: String,
		// quantity: Number,
		// description: String,

		ownerId: String,
		title: String,
		category: String,
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
	},
	{ timestamps: true },
);

const ProductSchema = mongoose.model('products', productModel);

module.exports = ProductSchema;
