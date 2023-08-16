const express = require('express');
const { verifyToken } = require('../../middleware');
const { generateResponse, promiseHandler } = require('../../utils/helper');
const { validateUpdateOrderPayload } = require('../../validations/orders/orders-validation');
const OrderSchema = require('../../databse/orders/order-schema');

const router = express.Router();

// TODO need to fix later
router.patch('/:orderId', verifyToken, async (req, res) => {
	const payload = req?.body;
	const orderId = req?.params?.orderId;

	if (!orderId) {
		return res.status(400).json(generateResponse(400, 'OrderId not found'));
	}

	const { isValid, details } = validateUpdateOrderPayload(payload);
	if (!isValid) {
		return res.status(400).json(
			generateResponse(400, 'Payload is not valid', undefined, {
				type: 'FIELD_ERROR',
				details,
			}),
		);
	}

	const [snapshot, error] = await promiseHandler(OrderSchema.findByIdAndUpdate(orderId, payload));

	if (error) return res.status(500).json(generateResponse(500, error?.message || 'Something went wrong'));
	if (snapshot) return res.status(200).json(generateResponse(200, 'Updated Successfully', snapshot));
	return res.status(500).json(generateResponse(500, 'Something went wrong!'));
});

module.exports = router;
