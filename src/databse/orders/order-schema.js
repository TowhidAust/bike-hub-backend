const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModel = new Schema(
  {
    userId: String,
    productId: String,
    variantId: String,
    sizeId: String,
    hasSku: Boolean,
    quantity: Number,
    paymentMethod: String,
    isPayment: Boolean,
    transactionEntryLogId: String,
    transactionId: String,
  },
  { timestamps: true },
);

const OrderSchema = mongoose.model('orders', orderModel);

module.exports = OrderSchema;
