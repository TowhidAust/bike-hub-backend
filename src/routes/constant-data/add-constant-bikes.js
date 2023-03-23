const express = require('express');
const ConstantBikeSchema = require('../../databse/constant-data/add-constant-bikes-schema');
const { generateResponse } = require('../../helper');
const { validateAddConstantBikePayload } = require('./validation');
const router = express.Router();

router.post('/', async (req, res) => {
    const bodyJson = req?.body;
    const { isValid, details } = validateAddConstantBikePayload(bodyJson);

    if (!isValid) {
        res.status(401);
        return res.json(
            generateResponse(401, 'Payload is not valid', undefined, {
                details: {
                    type: 'FIELD_ERROR',
                    details,
                },
            })
        );
    }

    ConstantBikeSchema.countDocuments(
        { bikeCode: bodyJson?.bikeCode },
        (error, count) => {
            if (error) {
                res.status(500);
                return res.json(generateResponse(500, error?.message));
            }

            if (count > 0) {
                res.status(409);
            }
        }
    );

    const newConstantBikeList = new ConstantBikeSchema(bodyJson);
    newConstantBikeList.save((error, result) => {
        if (error) {
            return res.json(generateResponse(500, error?.message));
        }

        if (result) {
            return res.json(
                generateResponse(200, 'Bike listed successfully', result)
            );
        }
    });
});

module.exports = router;
