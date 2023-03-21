const express = require("express");
const Signup = require("../../databse/auth/auth-schema");
const BikeListSchema = require("../../databse/bike-list/bike-list-schema");
const { generateResponse } = require("../../helper");
const router = express.Router();

router.post('/', async (req, res) => {
    const payload = req?.body;

    // verify the userId provided
    Signup.findById({ _id: payload?.userId }, async (error, snapshot) => {
        if (error) {
            res.status(500);
            return res.json(generateResponse(500, error?.message))
        }

        if (snapshot) {
            const newBikeList = new BikeListSchema(payload);
            newBikeList.save((error, result) => {
                if (error) {
                    return res.json(generateResponse(500, error?.message))
                }

                if (result) {
                    return res.json(generateResponse(200, 'Bike listed successfully'))
                }
            });
        }

    });


    // return res.json({ message: payload });

});

module.exports = router;