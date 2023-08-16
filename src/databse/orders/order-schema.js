const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	productId: String,
	variantId: String,
	sizeId: String,
	hasSku: Boolean,
	quantity: Number,
});

const orderModel = new Schema(
	{
		userId: String,
		paymentMethod: String,
		paymentStatus: Boolean,
		transactionId: String,
		isCancelled: Boolean,
		transactionEntryLogId: String,
		items: [itemSchema],
	},
	{ timestamps: true },
);

const OrderSchema = mongoose.model('orders', orderModel);

module.exports = OrderSchema;
