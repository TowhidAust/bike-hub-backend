const express = require("express");
const Signup = require("../../databse/auth/auth-schema");
const BikeListSchema = require("../../databse/bike-list/bike-list-schema");
const ConstantBikeSchema = require("../../databse/constant-data/add-constant-bikes-schema");
const { generateResponse } = require("../../helper");
const router = express.Router();

router.post('/', async (req, res) => {
    const bodyJson = req?.body;
    const newConstantBikeList = new ConstantBikeSchema(bodyJson);
    newConstantBikeList.save((error, result) => {
        if (error) {
            return res.json(generateResponse(500, error?.message))
        }

        if (result) {
            return res.json(generateResponse(200, 'Bike listed successfully'))
        }
    });



    // return res.json({ message: payload });

});

module.exports = router;