const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productVariantModel = new Schema(
  {
    price: Number,
    discount: Number,
    color: String,
    thumbnail: String,
    sizes: [{
      _id: String,
      size: String,
      inStock: Boolean,
      quantity: Number,
    }],
  },
  { timestamps: true },
);

const ProductVariantSchema = mongoose.model('productVariants', productVariantModel);

module.exports = ProductVariantSchema;
