const express = require('express');
const { verifyToken } = require('../../middleware');
const { generateResponse, promiseHandler } = require('../../utils/helper');
const { validateOrdersPayload } = require('../../validations/orders/orders-validation');
const OrderSchema = require('../../databse/orders/order-schema');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
	const payload = req.body;
	const { isValid, details } = validateOrdersPayload(payload);
	if (!isValid) {
		return res.status(400).json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}
	const myOrderSchema = new OrderSchema(payload);
	const [snapshot, error] = await promiseHandler(myOrderSchema.save());

	if (error) return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong'));
	if (snapshot) return res.status(200).json(generateResponse(200, 'Saved Successfully', snapshot));
	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
