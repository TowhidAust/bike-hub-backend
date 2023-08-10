const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = new Schema(
	{
		categoryName: String,
	},
	{ timestamps: true },
);

const CategorySchema = mongoose.model('categories', categoryModel);

module.exports = CategorySchema;
