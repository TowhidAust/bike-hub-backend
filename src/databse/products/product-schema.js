const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema(
	{
		ownerId: String,
		title: String,
		category: Array,
		hasSku: { type: Boolean, required: true },
		price: Number,
		inStock: Boolean,
		brand: String,
		modelNo: String,
		modelYear: String,
		madeIn: String,
		thumbnail: String,
		images: Array,
		isCertified: Boolean,
		certificationName: String,
		quantity: Number,
		description: String,
		warranty: Number,
		warrantyUnit: String,
		isArchived: Boolean,
	},
	{ timestamps: true },
);

const ProductSchema = mongoose.model('products', productModel);

module.exports = ProductSchema;
